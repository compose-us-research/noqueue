const migrations = [
  { version: 0, update: async () => {} },
  {
    version: 1,
    update: async (client) => {
      client.query("INSERT INTO version (version) VALUES (1)");
    },
  },
];
export default migrations;
