const tables = {
  tickets: {
    clear: prefix => `TRUNCATE "${prefix}_tickets";`,
    create: prefix => `CREATE TABLE "${prefix}_tickets" (
      "id" character varying(1024) PRIMARY KEY,
      "start" timestamp,
      "end" timestamp,
      "contact" jsonb
    );`,
    delete: prefix => `DROP TABLE "${prefix}_tickets";`
  },
  timeslots: {
    clear: prefix => `TRUNCATE "${prefix}_timeslots";`,
    create: prefix => `CREATE TABLE "${prefix}_timeslots" (
      "id" serial PRIMARY KEY,
      "day" integer,
      "start" time,
      "end" time,
      "customers" integer,
      "min_duration" integer,
      "max_duration" integer
    );`,
    delete: prefix => `DROP TABLE "${prefix}_timeslots";`
  }
}

module.exports = tables
