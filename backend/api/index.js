require('dotenv').config();

const app = require('../src/app');
const connectDB = require('../src/config/database');
const { resolveMongoUri } = require('../src/config/resolveMongoUri');
const { seedDatabase } = require('../src/config/seedDatabase');

let initPromise = null;

async function initIfNeeded() {
  if (!initPromise) {
    initPromise = (async () => {
      const uri = await resolveMongoUri();
      process.env.MONGO_URI = uri;
      await connectDB();

      if (process.env.AUTO_SEED === 'true' || process.env.AUTO_SEED === '1') {
        await seedDatabase();
      }
    })();
  }
  return initPromise;
}

module.exports = async (req, res) => {
  await initIfNeeded();
  return app(req, res);
};
