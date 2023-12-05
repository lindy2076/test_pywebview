import json


def get_data():
    with open("metro_stations.json") as f:
        data = json.load(f)
    return data


def get_moscow():
    d = get_data()
    return d[0]["data"]


def get_spb():
    d = get_data()
    return d[1]["data"]

