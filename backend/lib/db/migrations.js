const migrations = [
  { version: 0, update: async () => {} },
  {
    version: 1,
    update: async (client) => {
      client.query("INSERT INTO version (current_version) VALUES (1)");
    },
  },
];
module.exports = migrations;
