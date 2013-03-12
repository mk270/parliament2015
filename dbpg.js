module.exports = dbpg = function() {

    var pg = require('pg').native,
        connectionString = process.env.HEROKU_POSTGRESQL_RED_URL || 'postgres://localhost:5432/test';


    client = new pg.Client(connectionString)
    client.connect();
    //query = client.query('CREATE TABLE event (event_id SERIAL primary key,start_date date,end_date date,headline text,event_body text,media text,media_credit text,media_caption text,timeline_event_id integer,view_id text,tag text)');


    this.lookupEvents = function (callback) {

        var query = client.query("SELECT * FROM event");
        //Get events from db
        query.on('row', function(row, result) {
            row = {
                startDate: "2015,12,5",
                endDate: "2015,12,5",
                headline: row.headline,
                text: row.event_body,
                tag: row.tag,
                classname: '',
                asset: {
                    media: row.media,
                    thumbnail: '',
                    credit: row.media_credit,
                    caption: ''
                }
            }
            result.addRow(row)


        })
        query.on('end', callback)






    }


    this.addEvent = function (event) {
        client.query("INSERT INTO event(start_date, end_date, headline, event_body, media, media_credit) values($1, $2, $3, $4, $5, $6)", event)
    }


}

