'use strict';

const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config');
// const db = knex({
//   client: 'pg',
//   connection: DB_URL,
// });

var db = knex({
  client: 'pg',
  connection: {
    port: '5432',
    host: '127.0.0.1',
    user: 'david',
    password: 'password',
    database: 'NBA'
  },
  debug: true
});
app.set('db', db);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

