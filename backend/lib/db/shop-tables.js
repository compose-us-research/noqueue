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
  },
  daily_availability: {
    clear: prefix => `TRUNCATE "${prefix}_daily_availability";`,
    create: prefix => `CREATE TABLE "${prefix}_daily_availability" (
      "id" serial PRIMARY KEY,
      "start" date not null,
      "end" date,
      "min_duration" integer,
      "max_duration" integer,
      "monday" integer DEFAULT 0,
      "tuesday" integer DEFAULT 0,
      "wednesday" integer DEFAULT 0,
      "thursday" integer DEFAULT 0,
      "friday" integer DEFAULT 0,
      "saturday" integer DEFAULT 0,
      "sunday" integer DEFAULT 0
    );`,
    delete: prefix => `DROP TABLE "${prefix}_daily_availability";`
  },
  dayslots: {
    clear: prefix => `TRUNCATE "${prefix}_dayslots";`,
    create: prefix => `CREATE TABLE "${prefix}_dayslots" (
      "id" serial PRIMARY KEY,
      "start" date,
      "end" date,
      "customers" integer,
      "min_duration" integer default 0,
      "max_duration" integer default 0
    );`,
    delete: prefix => `DROP TABLE "${prefix}_dayslots";`
  }
}

module.exports = tables
