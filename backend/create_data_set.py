from collect_dates import closures_per_board
from datetime import date, timedelta
import pandas as pd

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


# Creating a base DataFrame

school_boards = ["TDSB", "DPCDSB", "PDSB", "YRDSB", "HCDSB"]

desired_date=2022

dates = get_winter_school_dates(desired_date)

df = pd.DataFrame([(d, sb) for d in dates for sb in school_boards], columns=["date", "school_board"])

# Add closed column
closure_dates_per_board=closures_per_board()

# Change to string type for comparison
df["date_str"]=df["date"].astype(str)

# set all closed to false
df["closed"]=0

# If school_board is matches current, and date is in dates_list, then set that day as school closed
for sb, dates_list in closure_dates_per_board.items():
    df.loc[(df["school_board"]==sb) & (df["date_str"].isin(dates_list)), "closed"] = 1

# Drop helper
df = df.drop(columns=["date_str"])

