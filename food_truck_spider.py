#!/usr/bin/env python

import sys, requests, urllib, json, csv
from bs4 import BeautifulSoup as bs


def penn_food_truck_spider():
    """
    Crawls Penn Food Trucks for food truck data.
    Returns a triple of names, north-south streets, and east-west streets
    """
    url = "https://pennfoodtrucks.com/sort"
    html = requests.get(url).text
    soup = bs(html, "html.parser")

    # h3 tag contains food truck names
    names = [link.string for link in soup.findAll('h3') if not 'span' in str(link)]

    # h4 tag contains street intersections (as well as food type, hours, etc...)
    h4s = [link.string for link in soup.findAll('h4') if not link.string == None]
    cross_roads = [h4 for h4 in h4s if " and " in h4]
    north_south = [cr.split(' and ')[0] for cr in cross_roads]
    east_west = [cr.split(' and ')[1] for cr in cross_roads]

    #Clean x/y format for locations between streets
    #As a default, select first street listed
    north_south = [ns.split("/")[0] for ns in north_south]
    east_west = [ew.split("/")[0] for ew in east_west]

    return(names, north_south, east_west)



def geocode(addr):
    """
    Input: String containing a street intersection
    Output: A tuple consisting of the latitude and longitude of that intersection
    """
    url = "http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % (urllib.quote(addr.replace(' ', '+')))
    data = urllib.urlopen(url).read()
    info = json.loads(data).get("results")[0].get("geometry").get("location")
    lat = info['lat']
    lng = info['lng']
    return (lat, lng)



def write_csv(names, north_south, east_west, lats, lngs):
    header = ["FOOD_TRUCK_NAME", "NORTH_SOUTH", "EAST_WEST", "LAT", "LONG"]
    f = open('food_trucks.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(header)
    for n, ns, ew, lat, lng in zip(names, north_south, east_west, lats, lngs):
        row = [n, ns, ew, lat, lng]
        writer.writerow(row)




if __name__=='__main__':
    names, north_south, east_west = penn_food_truck_spider()

    lats = []
    lngs = []
    for ns, ew in zip(north_south, east_west):
        address = ns + " and " + ew + ", philadelphia, pa"
        lat, lng = geocode(address)
        lats.append(lat)
        lngs.append(lng)

    write_csv(names, north_south, east_west, lats, lngs)
