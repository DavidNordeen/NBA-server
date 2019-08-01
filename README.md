
# NBA Ranker

This app allows users to rank NBA players for a fantasy basketball draft. User's ranks and comments are saved so they can be reviewed and updated at any point.

## Homepage Screenshot

![Homepage](https://github.com/DavidNordeen/NBA-Client/blob/master/BballRank.JPG)

## Technology

* Node.js
* Express
* Postgres
* Deployed via Heroku

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb nba`, `createdb nba-test`
- Create database user: `createuser nba`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE nba TO nba`
  - `GRANT ALL PRIVILEGES ON DATABASE "nba-test" TO nba`
- Prepare environment file: `cp example.env .env`
  - Replace values in `.env` with your custom values if necessary.
- Bootstrap development database: `MIGRATION_DB_NAME=nba npm run migrate`
- Bootstrap test database: `MIGRATION_DB_NAME=nba-test npm run migrate`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the database for development: `psql -U nba -d nba -a -f seeds/seed.NBA_table.sql`
- To clear seed data: `psql -U nba -d nba nba-a -f seeds/trunc.NBA_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`
