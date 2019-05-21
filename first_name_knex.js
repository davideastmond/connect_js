// Input from user
const userInput = process.argv[2];
const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});
if (!userInput) {
  console.log("Please enter a search field")
  return;
} else {
  console.log("Searching...");
  searchForName(knex, userInput);
}

function searchForName(connector, searchQuery) {
  /* Input a knex client object and a name to search ad we'll try to find it*/
  connector.select('*').from('famous_people').where('first_name', searchQuery).orWhere('last_name', searchQuery).asCallback((err, result) => {
    if (err) {
      console.log(err);
    } else {
      displayResult(result);
      connector.destroy();
    }
  });

  function displayResult(res) {
    /* Helper function: formats the results as per the exercise requirements */
    if (res) {
      console.log(`Found ${res.length} result(s) by the name '${userInput}'`)
      for (let i = 0; i < res.length; i++ ) {
        const formattedDate = getFormattedDate(res[i]['birthdate']);
        console.log(`- ${i + 1}: ${res[i]['first_name']} ${res[i]['last_name']}, born ${formattedDate}`);
      }
    }
  }

  function getFormattedDate(dateString) {
    /* Returns a date in YYYY-MM-dd*/
    const date_input = new Date(dateString);
    const day = date_input.getDay();
    const month = date_input.getMonth() + 1;
    const year = dateString.getFullYear();
    return `${year}-${month}-${day}`;
  }
}