const migrations = [
  { version: 0, update: async () => {} },
  {
    version: 1,
    update: async (client) => {
      client.query("INSERT INTO version (current_version) VALUES (1)");
    },
  },
  {
    version: 2,
    update: async (client) => {
      const results = await client.query("SELECT prefix FROM public.shops;");
      await results.rows.reduce(async (a, shop) => {
        await a;
        const name = shop.prefix;
        // whole day + availability
        return client.query(`CREATE TABLE "${name}_dayslots" (
          "start" date not null,
          "end" date,
          "available" boolean default false
        )`);
      }, Promise.resolve());
    },
  },
];
module.exports = migrations;
