/** Write a new script file in this same repo that expects to take in a single command line argument
 * (through ARGV) and use it to find and output famous people by their first or last name. */
const client = require("./test_script");
const userInput = process.argv[2];
if (!userInput) {
  console.log("Please enter a search field")
  return;
}
const query = {
  //
  name: 'get-name',
  text: 'SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text',
  values: [userInput]
}
console.log("Searching...")
client.runQuery(query, displayResult);

function displayResult(res) {
  if (res.rows) {
    console.log(`Found ${res.rows.length} result(s) by the name '${userInput}'`)
    for (let i = 0; i < res.rows.length; i++ ) {
      const formattedDate = getFormattedDate(res.rows[i]['birthdate']);
      console.log(`- ${i + 1}: ${res.rows[i]['first_name']} ${res.rows[i]['last_name']}, born ${formattedDate}`);
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