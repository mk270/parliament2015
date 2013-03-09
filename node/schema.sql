CREATE TABLE event (
           event_id integer primary key,
   start_date date,
   end_date date,
   headline text,
   event_body text,
   media text,
   media_credit text,
   media_caption text,
   timeline_event_id integer,
   view_id text,
   tag text
);
