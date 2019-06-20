'use strict';
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://nba-client.now.sh',
  DB_URL: process.env.DATABASE_URL || 'postgres://btzggybkvnwudt:72e9a61707b49234869959707ad9b1dc07b3b09ae243aea63bff2b383bbb9b26@ec2-23-21-186-85.compute-1.amazonaws.com:5432/dtvn39d8uelen',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  // API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
};
