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



knex.from('famous_people').select("*").where('first_name', agrs[0])
  .then((rows) => {
        let i = 1;
        for (column of rows) {
            console.log(column);
            console.log(`${i}: ${column.first_name} ${column.last_name}, born '${column.birthdate}'`);
            i += 1;
        }
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });
