#!/usr/bin/env python

import requests
import sys
from bs4 import BeautifulSoup as bs

import csv

def spider():
    url = "https://pennfoodtrucks.com/sort"
    html = requests.get(url).text
    soup = bs(html, "html.parser")

    names = [link.string for link in soup.findAll('h3') if not 'span' in str(link)]
    h4s = [link.string for link in soup.findAll('h4') if not link.string == None]
    cross_roads = [h4 for h4 in h4s if " and " in h4]
    north_south = [cr.split(' and ')[0] for cr in cross_roads]
    east_west = [cr.split(' and ')[1] for cr in cross_roads]

    #for ftn, cr in zip(names, cross_roads):
    #    print ftn, ":::", cr

    for n, ns, ew in zip(names, north_south, east_west):
        print(n + "," + ns + "," + ew)

    return(names, north_south, east_west)

def write_csv(names, north_south, east_west):
    header = ["FOOD_TRUCK_NAME", "NORTH_SOUTH", "EAST_WEST"]
    f = open('food_trucks.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(header)
    for n, ns, ew in zip(names, north_south, east_west):
        row = [n, ns, ew]
        writer.writerow(row)

if __name__=='__main__':
    if len(sys.argv) != 1:
        print("Quit fooling around")
    names, north_south, east_west = spider()
    write_csv(names, north_south, east_west)
