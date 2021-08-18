
exports.fetch3d = function(req, res) {
  
  var video_id = req.body.video_id;
  var session_id = req.body.s_i;

  var session_select_query = 'SELECT * FROM session_ids WHERE session_id = "' + session_id + '"';

  var database = require('./exports/database.js');

  database.ConnectDB(function(DBerr, con) {
    if (DBerr) {
      console.log(DBerr);
      res.sendStatus(507);
      con.end();
    } else {
      con.query(session_select_query, function(session_select_err, session_select_rows) {
        if (session_select_err) {
          console.log(session_select_err);
          res.sendStatus(500);
          con.end();
        } else {
          if (session_select_rows.length == 1) {

            var fetch_detail_query = 'SELECT * from videos_detail where video_id ="'+ video_id +'"';

            con.query(fetch_detail_query, function(fetch_detail_err, fetch_detail_rows) {
              if (fetch_detail_err) {
                console.log(fetch_detail_err);
                res.sendStatus(502);
                con.end();
              } else {
                res.send(fetch_detail_rows);
                con.end();
              }
            })

          } else {
            res.sendStatus(501);
            con.end();
          }
        }
      })
    }
  })

}