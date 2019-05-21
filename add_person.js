const parser = require("./test_script");
const inputs = parser.getArguments(3);
const knex = require("./knex");
const cObj = knex.getDBConnection();


function addPerson(connector, args) {
  // Takes a knex connection as an argument, connects to data base and inserts the record
  if (connector) {
    connector.insert({first_name: args[0], last_name: args[1] , birthdate: args[2]}).into("famous_people").then(function (results) {
      console.log(results);
      connector.destroy();
      console.log("Entry added succesfully");
    });
    
  } else {
    console.log("No connector");
  }
}

addPerson(cObj, inputs);