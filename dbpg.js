module.exports = dbpg = function() {

    var pg = require('pg').native,
        connectionString = process.env.HEROKU_POSTGRESQL_RED_URL || 'postgres://localhost:5432/test';


    client = new pg.Client(connectionString)
    client.connect();
    //query = client.query('CREATE TABLE event (event_id SERIAL primary key,start_date 
    //date,end_date date,headline text,event_body text,media text,media_credit text,media_caption 
    //text,timeline_event_id integer,view_id text,tag text)');


    this.lookupEvents = function (callback) {



        var query = client.query("SELECT * FROM event");
        //Get events from db
        query.on('row', function(row, result) {
            var changeDateFormat = function(oldDate) {

                var year = oldDate.getUTCFullYear()
                var month = oldDate.getUTCMonth() + 1
                var day = oldDate.getDate()
                var newDate = year+","+month+","+day
                return newDate

            }
            var newStartDate = changeDateFormat(row.start_date)
            var newEndDate = changeDateFormat(row.end_date)
            row = {
                startDate: newStartDate,
                endDate: newEndDate,
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
            console.log(row)

        })
        query.on('end', callback)






    }

    this.lookupEvents = function (callback) {



        var query = client.query("SELECT * FROM event");
        //Get events from db
        query.on('row', function(row, result) {
            var changeDateFormat = function(oldDate) {

                var year = oldDate.getUTCFullYear()
                var month = oldDate.getUTCMonth() + 1
                var day = oldDate.getDate()
                var newDate = year+","+month+","+day
                return newDate

            }
            var newStartDate = changeDateFormat(row.start_date)
            var newEndDate = changeDateFormat(row.end_date)
            row = {
                startDate: newStartDate,
                endDate: newEndDate,
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
            console.log(row)

        })
        query.on('end', callback)






    }


    this.lookupEvents2 = function (callback,eventid) {



        var query = client.query("SELECT * FROM event where timeline_event_id = " + eventid);
        //Get events from db
        query.on('row', function(row, result) {
            var changeDateFormat = function(oldDate) {

                var year = oldDate.getUTCFullYear()
                var month = oldDate.getUTCMonth() + 1
                var day = oldDate.getDate()
                var newDate = year+","+month+","+day
                return newDate

            }
            var newStartDate = changeDateFormat(row.start_date)
            var newEndDate = changeDateFormat(row.end_date)
            row = {
                startDate: newStartDate,
                endDate: newEndDate,
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
            console.log(row)

        })
        query.on('end', callback)


    }


    
    this.addEvent = function (event) {
        client.query("INSERT INTO event(start_date, end_date, headline, event_body, media, media_credit) values($1, $2, $3, $4, $5, $6)", event)
    }


}

