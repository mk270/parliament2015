module.exports = dbpg = function() {

    var pg = require('pg').native,
        connectionString = process.env.HEROKU_POSTGRESQL_RED_URL || 'postgres://bpghvtxotnletg:URODmcaUag9GS97qV9HA8yVMz8@ec2-23-21-91-29.compute-1.amazonaws.com:5432/dedsjn8fokp8l8';


  console.log(connectionString);

    client = new pg.Client(connectionString)
    client.connect();


    this.lookupEvents = function (callback) {



        var query = client.query("SELECT event_id, start_date, end_date, headline, event_body, media, media_credit, media_caption, timeline_event_id, view_id, tag, provenance, twitter_id, twitter_photo_url FROM event");
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
                thumbnail: row.twitter_photo_url,
                credit: '<a href=https://twitter.com/'+row.twitter_id+'/>',
                caption: ''
              },
			  provenace: row.provenance,
			  twitter: {
				userid: row.twitter_id,
				name: row.twitter_name,
				photo: row.twitter_photo_url
              }
			};
          result.addRow(row)

        })
        query.on('end', callback)






    }


    this.addEvent = function (event) {
        client.query("INSERT INTO event(start_date, end_date, headline, event_body, media, media_credit, twitter_id, twitter_photo_url) values($1, $2, $3, $4, $5, $6, $7, $8)", event)
    }


}

