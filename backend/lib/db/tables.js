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
    clear: `TRUNCATE version;`,
    create: `CREATE TABLE version (
      "current_version" integer PRIMARY KEY
    );`,
    delete: `DROP TABLE version;`,
  },
};

module.exports = tables;
