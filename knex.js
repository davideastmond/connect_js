// Creates a knex object and returns it so we can use it again
const settings = require("./settings");
module.exports = {
  getDBConnection: function() {
    var knex = require('knex')({
      client: 'pg',
      connection: {
        host : settings.host,
        user : settings.user,
        password : settings.password,
        database : settings.database
      }
    })
    return knex;
  }
}

