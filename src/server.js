'use strict';

const knex = require('knex');
const app = require('./app');
const { PORT } = require('./config');

var db = knex({
  client: 'pg',
  connection: {
    // port: '5432',
    // host: '127.0.0.1',
    // user: 'david',
    // password: 'password',
    // database: 'NBA'
    port: '5432',
    host: 'ec2-23-21-186-85.compute-1.amazonaws.com',
    user: 'btzggybkvnwudt',
    password: '72e9a61707b49234869959707ad9b1dc07b3b09ae243aea63bff2b383bbb9b26',
    database: 'dtvn39d8uelen'
  },
  debug: true
});
app.set('db', db);
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});

