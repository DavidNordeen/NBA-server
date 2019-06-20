'use strict';
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://nba-client.now.sh/',
  DB_URL: process.env.DATABASE_URL || 'postgresql://david:password@localhost:5432/NBA',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  // API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
};
