#This code converts csv files to JSON
# Code Version is 1.0 
# Written 25/11/2012 at ParlyHack 2012 London - UK
# Version written by Fei 
# Code partly based on http://johntron.com/creations/csv-to-json/ Great Starting point!!

import csv
import json
import sys

def run():
    reader = csv.DictReader( sys.stdin, fieldnames = ( "year","seats","party","color" ) )
    rows = [ row for row in reader ]

    election_ids = set([ row["year"] for row in rows ])

    data = {}

    for election_id in election_ids:
        data[election_id] = []
        for i in rows:
            row = i.copy()
            row["seats"] = int(row["seats"])
            if row["year"] == election_id:
                del(row["year"])
                data[election_id].append(row)


    print json.dumps(data, indent=2 )

if __name__ == '__main__':
    run()
