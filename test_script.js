const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

module.exports = {
    runQuery: function (query, callback) {
      client.connect((err) => {
      if (err) {
        return console.error("Connection Error", err);
      }

      client.query(query, (err, res) => {
        if (err) {
          console.log("error");
        } else {
          callback(res);
          client.end();
        }
      })
    })
  }
}

module.exports = {
  getArguments: function(count) {
    // Helper function returns an array of arguments from the console input
    // adhering to the count specified
    
    const vals = process.argv.slice(2);
    if (vals.length != count) {
      console.log("Invalid number of arguments received from input");
    } else {
      return vals;
    }
  }
}