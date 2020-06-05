const tables = {
  shops: {
    clear: `TRUNCATE shops;`,
    create: `CREATE TABLE shops (
      "name" character varying(1024) PRIMARY KEY,
      "prefix" character varying(1024) UNIQUE,
      "data" jsonb
    );`,
    delete: `DROP TABLE shops;`
  }
}

module.exports = tables
