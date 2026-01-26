def makeUnique():
    collection = """
    (TDSB)
    2026-01-25
    2026-01-15
    2019-02-12
    2022-01-17
    2022-12-22
    2022-01-17
    2025-02-13
    (DPCDSB)
    2025-02-13
    2022-01-17
    2022-01-18
    2026-01-26
    2019-02-12
    2015-02-02
    2016-03-24
    2021-02-16
    2019-01-29
    2026-01-15
    (PDSB)
    2015-02-02
    2019-02-12
    2019-01-29
    2021-02-16
    2025-02-13
    2026-01-26
    2022-01-18
    2022-12-22
    2026-01-15
    2016-03-24
    2015-12-28
    2016-03-01
    2015-02-02
    2019-02-06
    2022-02-18
    (YRDSB)
    2026-01-26
    2025-02-13
    2026-01-15
    2022-01-17
    2021-02-16
    2022-01-17
    2022-03-23
    2022-02-17
    2022-12-23
    (HCDSB)
    2019-02-12
    2016-03-24
    2018-04-16
    2019-01-29
    2021-02-16
    2019-02-27
    2022-01-17
    2023-02-23
    2022-02-18
    2022-01-18
    """

    unique_snow_days=[]

    for line in collection.splitlines():
        line = line.strip()
        if line.startswith("2") and line not in unique_snow_days:
            unique_snow_days.append(line)

    unique_snow_days.sort()

    for day in unique_snow_days:
        print(day)

    print(len(unique_snow_days))

    return unique_snow_days


def closures_per_board():
    collection = """
    (TDSB)
    2026-01-25
    2026-01-15
    2019-02-12
    2022-01-17
    2022-12-22
    2022-01-17
    2025-02-13
    (DPCDSB)
    2025-02-13
    2022-01-17
    2022-01-18
    2026-01-26
    2019-02-12
    2015-02-02
    2016-03-24
    2021-02-16
    2019-01-29
    2026-01-15
    (PDSB)
    2015-02-02
    2019-02-12
    2019-01-29
    2021-02-16
    2025-02-13
    2026-01-26
    2022-01-18
    2022-12-22
    2026-01-15
    2016-03-24
    2015-12-28
    2016-03-01
    2015-02-02
    2019-02-06
    2022-02-18
    (YRDSB)
    2026-01-26
    2025-02-13
    2026-01-15
    2022-01-17
    2021-02-16
    2022-01-17
    2022-03-23
    2022-02-17
    2022-12-23
    (HCDSB)
    2019-02-12
    2016-03-24
    2018-04-16
    2019-01-29
    2021-02-16
    2019-02-27
    2022-01-17
    2023-02-23
    2022-02-18
    2022-01-18
    """

    dict = {}
    current_board=None

    for line in collection.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("(") and line.endswith(")"):
            current_board = line[1:-1]
            dict[current_board]=[]
        else:
            if current_board:
                dict[current_board].append(line)
    
    print(dict)
    return dict
            



if __name__=="__main__":
    closures_per_board()