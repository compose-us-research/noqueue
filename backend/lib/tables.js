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
      "id" serial PRIMARY KEY,
      "user" character varying(1024),
      "start" timestamp,
      "end" timestamp,
      "ready" boolean DEFAULT false,
      "used" boolean DEFAULT false
    );`,
    delete: 'DROP TABLE tickets;',
  },
  timeslots: {
    clear: 'TRUNCATE timeslots;',
    create: `CREATE TABLE timeslots (
      "id" serial PRIMARY KEY,
      "start" time,
      "end" time,
      "customers" integer
    );`,
    delete: 'DROP TABLE timeslots;',
  }
}

module.exports = tables
