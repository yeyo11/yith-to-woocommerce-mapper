import dotenv from 'dotenv';

import { buildCsvService, buildDB, buildStripeService } from './services/index.js';
import { yithToWcSubscriptions } from './yithToWcSubscriptions.js';

const main = async () => {
  dotenv.config();

  const db = await buildDB({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  const stripeService = buildStripeService(process.env.STRIPE_API_KEY);
  const csvService = buildCsvService();

  const yithSubscriptions = await csvService.readCsv();
  const wcSubscriptions = await yithToWcSubscriptions({
    yithSubscriptions,
    db,
    stripeService,
  });
  await csvService.generateCsv(wcSubscriptions);

  await db.close();
  
  return Promise.resolve(wcSubscriptions.length);
};

main()
  .then((nSubscriptions) => {
    console.log(`Successfully processed ${nSubscriptions} subscriptions!`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
