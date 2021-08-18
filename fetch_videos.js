
exports.fetchVideos = function(req, res) {
  // var user_email = req.body.user_email;
  // var session_id = req.body.s_i;

  // var session_select_query = 'SELECT * FROM session_ids WHERE session_id = "' + session_id + '"';

  var database = require('./exports/database.js');

  database.ConnectDB(function(DBerr, con) {
    if (DBerr) {
      console.log(DBerr);
      res.sendStatus(507);
      con.end();
    } else {
      // con.query(session_select_query, function(session_select_err, session_select_rows) {
        // if (session_select_err) {
        //   console.log(session_select_err);
        //   res.sendStatus(500);
        //   con.end();
        // } else {
          // if ((session_select_rows.length == 1) && (session_select_rows[0].user_email.toLowerCase() == user_email.toLowerCase()) && (user_email != buyer_email)) {

            var today = new Date().getUTCMilliseconds();
            var session_id = (today + Math.random() + 1).toString(36).substring(7) + (today + Math.random() + 2).toString(36).substring(7) + (today + Math.random() + 3).toString(36).substring(7);
            console.log(session_id);
            var session_insert_query = 'INSERT INTO session_ids (session_id) VALUES ("' + session_id + '")';

            con.query(session_insert_query, function(insert_err, insert_rows) {
              if (insert_err) {
                console.log(insert_err);
                res.sendStatus(503);

                con.end();
              } else {
                console.log('Session ID created: ' + session_id);
                // res.send(session_id);
                // con.end();
                 var fetch_videos_query = 'SELECT * from videos_info';

                  con.query(fetch_videos_query, function(fetch_videos_err, fetch_videos_rows) {
                    if (fetch_videos_err) {
                      console.log(fetch_videos_err);
                      res.sendStatus(502);
                      con.end();
                    } else {
                      // Adding another column - session_id in videos_info table
                      fetch_videos_rows[0].session_id = session_id;
                      console.log(fetch_videos_rows);
                      res.send(fetch_videos_rows);
                      con.end();
                    }
                  })
              }
            });

          // } else {
          //   res.sendStatus(501);
          //   con.end();
          }
        // }
      // })
    // }
  })

}