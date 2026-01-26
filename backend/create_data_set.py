from collect_dates import closures_per_board
from datetime import date, timedelta, datetime
import pandas as pd
import requests
import os 
from dotenv import load_dotenv
import time

load_dotenv()
API_KEY = os.getenv("OPEN_WEATHER_KEY")

LAT_LON_PER_BOARD = {
    "TDSB": (43.76711025624156, -79.41292393574588),
    "DPCDSB": (43.61959914105463, -79.67165378935178),
    "PDSB": (43.618184939805396, -79.67048046051627),
    "YRDSB": (43.999344220892226, -79.47091599543542),
    "HCDSB": (43.34191676866363, -79.80310709490871)
}

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

    # Start and end of the day
    start = unix_time(datetime(date_obj.year, date_obj.month, date_obj.day, 0, 0))
    end = unix_time(datetime(date_obj.year, date_obj.month, date_obj.day, 23, 59))

    url = f"https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={long}&type=hour&start={start}&end={end}&appid={API_KEY}&units=metric"
    
    resp = requests.get(url)

    if resp.status_code != 200:
        print("API failed:", resp.text)
        return {
            "snowfall_overnight_cm": 0,
            "snowfall_24h_cm": 0,
            "temp_min_overnight_c": 0,
            "wind_gust_overnight_kmh": 0
        }

    data = resp.json()

    # Initialize features

    snowfall_24h = 0
    snowfall_overnight = 0
    temp_min_overnight = float("inf")
    wind_gust_overnight = 0

    for hour in data.get("list", []):
        dt_hour = datetime.utcfromtimestamp(hour["dt"]) # convert tiem stamp to datetime
        snow = hour.get("snow", {}).get("1h", 0) #snow in the last hour (mm)
        wind_speed = hour.get("wind", {}).get("speed", 0) * 3.6 # m/s to km/h
        temp_min = hour.get("main", {}).get("temp_min", 0)

        snowfall_24h+=snow

        # Consider overnight hours

        if 0<= dt_hour.hour <= 6:
            snowfall_overnight += snow
            temp_min_overnight = min(temp_min_overnight, temp_min)
            wind_gust_overnight = max(wind_gust_overnight, wind_speed)

    return {
        "snowfall_overnight_cm": snowfall_overnight / 10,
        "snowfall_24h_cm": snowfall_24h / 10,
        "temp_min_overnight_c": temp_min_overnight,
        "wind_gust_overnight_kmh": wind_gust_overnight
    }


# Creating a base DataFrame

school_boards = ["PDSB"]

desired_date=2014

dates = get_winter_school_dates(desired_date)

df = pd.DataFrame([(d, sb) for d in dates for sb in school_boards], columns=["date", "school_board"])

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
    
    # time.sleep(1)
    print(f"DEBUG{idx}")

df.to_csv("snow_day_dataset.csv", index=False)