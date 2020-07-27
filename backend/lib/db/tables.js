const tables = {
  shops: {
    clear: `TRUNCATE shops;`,
    create: `CREATE TABLE shops (
      "name" character varying(1024) PRIMARY KEY,
      "prefix" character varying(1024) UNIQUE,
      "data" jsonb
    );`,
    delete: `DROP TABLE shops;`,
  },
  version: {
    clear: `TRUNCATE versions;`,
    create: `CREATE TABLE versions (
      "current_version" integer PRIMARY KEY
    );`,
    delete: `DROP TABLE versions;`,
  },
};

module.exports = tables;
