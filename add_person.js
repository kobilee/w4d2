const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let  agrs = process.argv.slice(2);

const person = [
    { first_name: agrs[0], last_name: agrs[1], birthdate: new Date(agrs[2])}
  ];

knex('famous_people').insert(person).then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
