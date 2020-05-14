# Data Model

PostgreSQL is used as data persistence layer.

## Environment Variables 

The following environment variables can be used to overwrite the default values:

- `DB_USER`: The user for the database connection (default: `postgres`).
- `DB_HOST`: The host for the database connection (default: `localhost`).
- `DB_DATABASE`: The db name for the database connection (default: `postgres`).
- `DB_PASSWORD`: The password for the database connection (default: `null`).
- `DB_PORT`: The port for the database connection (default: `null`).

## Tables

All tables are defined in `lib/tables.js`.
The key in the `lib/tables.js` file matches the table name.
If the tables don't exist, they are created at server start with the script defined in `lib/tables.js`.
See the create script for more details about the data types and keys.    

### config

`config` contains settings for the shop like the name, geographical position, etc. 

- `name`: Name of the configuration as a string.
  At the moment only `default` is used.
- `data`: The config as a JSON object.

### tickets

`tickets` contains all issued tickets. 

- `id`: Id of the ticket as a string.
- `user`: User that issued the ticket as a string.
- `start`: Start of the validity of the ticket as a date object.
- `end`: End of the validity of the ticket as a date object.
- `ready`: Boolean flag if the ticket can be used immediately.
- `used`: Boolean flag that is true if the ticket was already used.

### timeslots 

`timeslots` contains the available time slots.

- `id`: Id of the time slot as an integer.
- `day`: Day of the week as an integer (0 - 6; Sunday is 0).
- `start`: Start of the time slot as a date object.
- `end`: End of the time slot as a date object.
- `customers`: Maximum number of customers for this time slot.
