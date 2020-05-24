const tables = {
  config: {
    clear: 'TRUNCATE config;',
    create: `CREATE TABLE config (
      "name" character varying(1024) PRIMARY KEY,
      "data" jsonb
    );`,
    delete: 'DROP TABLE config;'
  },
  tickets: {
    clear: 'TRUNCATE tickets;',
    create: `CREATE TABLE tickets (
      "id" character varying(1024) PRIMARY KEY,
      "start" timestamp,
      "end" timestamp,
      "contact" jsonb
    );`,
    delete: 'DROP TABLE tickets;'
  },
  timeslots: {
    clear: 'TRUNCATE timeslots;',
    create: `CREATE TABLE timeslots (
      "id" serial PRIMARY KEY,
      "day" integer,
      "start" time,
      "end" time,
      "customers" integer,
      "min_duration" integer,
      "max_duration" integer
    );`,
    delete: 'DROP TABLE timeslots;'
  }
}

module.exports = tables
