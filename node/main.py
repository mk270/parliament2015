#!/usr/bin/env python

from flask import Flask
app = Flask(__name__)

import sqlite3
import json

def dict_factory(cursor, row):
    d = {}
    for idx,col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.route("/")
def event_data():
    db = sqlite3.connect('/home/mk270/Prog/node/test.db')
    db.row_factory=dict_factory
    c = db.cursor()
    c.execute("select * from event;")
    data = [ row for row in c.fetchall() ]
    return json.dumps(data, indent=2)

if __name__ == "__main__":
    print event_data()
    app.run()
