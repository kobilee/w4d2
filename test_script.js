const pg = require("pg");
const settings = require("./settings"); // settings.json
let  agrs = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name =  '${agrs[0]}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    print(result.rows);
 //output: 1
    client.end();
  });
});

function print(rows){
    rows.forEach(function(column, i) {
      console.log(`${i + 1}: ${column.first_name} ${column.last_name}, born '${column.birthdate}'`);
    });
}