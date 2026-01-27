from collect_dates import closures_per_board
from datetime import date, timedelta, datetime
import pandas as pd
import requests
import os 
from dotenv import load_dotenv
import time
import openmeteo_requests
import requests_cache
from retry_requests import retry

load_dotenv()
#API_KEY = os.getenv("OPEN_WEATHER_KEY")
start_time = time.perf_counter()

LAT_LON_PER_BOARD = {
    "TDSB": (43.76711025624156, -79.41292393574588),
    "DPCDSB": (43.61959914105463, -79.67165378935178),
    "PDSB": (43.618184939805396, -79.67048046051627),
    "YRDSB": (43.999344220892226, -79.47091599543542),
    "HCDSB": (43.34191676866363, -79.80310709490871)
}

cache_session = requests_cache.CachedSession('.cache', expire_after=-1)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo_client = openmeteo_requests.Client(session=retry_session)

# API expects UNIX timestamps
def unix_time(dt):
    return int(dt.timestamp())

def get_winter_school_dates(start_year):
    """
    To return all school weekdays from Nov 1 of start_year to Mar 31 of next year
    """

    start = date(start_year, 11, 1)
    end = date(start_year+1, 3, 31)

    delta = timedelta(days=1)
    days=[]

    current = start

    while current<=end:
        if current.weekday() < 5:
            days.append(current)
        current+=delta
    
    return days

def get_weather_for_date(board, date_obj):
    lat, long = LAT_LON_PER_BOARD[board]

    url = "https://archive-api.open-meteo.com/v1/archive"

    params = {
        "latitude": lat,
        "longitude": long,
        "start_date": date_obj.isoformat(),
        "end_date": date_obj.isoformat(),
        "hourly": ["temperature_2m", "snowfall", "precipitation", "wind_gusts_10m"]
    }

    try:
        responses = openmeteo_client.weather_api(url, params=params)
        response = responses[0] if responses else None
    except Exception as exc:
        print("API failed:", exc)
        response = None

    if response is None:
        return {
            "snowfall_overnight_cm": 0,
            "snowfall_24h_cm": 0,
            "temp_min_overnight_c": 0,
            "wind_gust_overnight_kmh": 0
        }

    hourly = response.Hourly()

    hourly_index = pd.date_range(
        start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
        end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
        freq=pd.Timedelta(seconds=hourly.Interval()),
        inclusive="left"
    )

    hourly_data = pd.DataFrame(
        data={
            "timestamp": hourly_index,
            "temperature_2m": hourly.Variables(0).ValuesAsNumpy(),
            "snowfall_mm": hourly.Variables(1).ValuesAsNumpy(),
            "precipitation_mm": hourly.Variables(2).ValuesAsNumpy(),
            "wind_gusts_10m": hourly.Variables(3).ValuesAsNumpy(),
        }
    )

    overnight_hours = hourly_data.loc[hourly_data["timestamp"].dt.hour <= 6]

    snowfall_24h_cm = float(hourly_data["snowfall_mm"].sum()) / 10
    snowfall_overnight_cm = float(overnight_hours["snowfall_mm"].sum()) / 10 if not overnight_hours.empty else 0
    temp_min_overnight_c = float(overnight_hours["temperature_2m"].min()) if not overnight_hours.empty else 0
    wind_gust_overnight_kmh = float(overnight_hours["wind_gusts_10m"].max()) if not overnight_hours.empty else 0

    return {
        "snowfall_overnight_cm": snowfall_overnight_cm,
        "snowfall_24h_cm": snowfall_24h_cm,
        "temp_min_overnight_c": temp_min_overnight_c,
        "wind_gust_overnight_kmh": wind_gust_overnight_kmh
    }


# Creating a base DataFrame

school_boards = ["TDSB", "DPCDSB", "PDSB", "YRDSB", "HCDSB"]

start_year = 2021
end_year = 2022

all_rows = []
for year in range(start_year, end_year + 1):
    for d in get_winter_school_dates(year):
        for sb in school_boards:
            all_rows.append((d, sb))

df = pd.DataFrame(all_rows, columns=["date", "school_board"])

# Add closed column
closure_dates_per_board=closures_per_board()

# Change to string type for comparison
df["date_str"]=df["date"].astype(str)

# set all closed to false. 0 for not closed, 1 for closed
df["closed"]=0

# If school_board is matches current, and date is in dates_list, then set that day as school closed
for sb, dates_list in closure_dates_per_board.items():
    df.loc[(df["school_board"]==sb) & (df["date_str"].isin(dates_list)), "closed"] = 1

# Drop helper
df = df.drop(columns=["date_str"])

# Add weather information to dataframe

weather_cols = ["snowfall_overnight_cm", "snowfall_24h_cm", "temp_min_overnight_c", "wind_gust_overnight_kmh"]

for col in weather_cols:
    df[col]=None

# Fill dataframe with API data

print("DataFrame length:", len(df))
print(df.head(10))

for idx, row in df.iterrows():
    weather = get_weather_for_date(row["school_board"], row["date"])
    for col in weather_cols:
        df.at[idx, col] = weather[col]
    
    #time.sleep(1)
    print(f"Calculating: Row {idx}")

df.to_csv("snow_day_dataset.csv", index=False)

total_seconds = time.perf_counter() - start_time
print(f"Run completed in {total_seconds:.2f} seconds (~{total_seconds/60:.2f} minutes)")