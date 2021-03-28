import 'reflect-metadata';
import { createSchema } from './app/setup/setup-graphql';
import { createHTTPConnection } from './app/setup/setup-http';
import { createDatabaseConnection } from './app/setup/setup-mongo';
import { RESOLVERS } from './resolvers';

/**
 * Application entry.
 */
const main = async () => {
  const schema = await createSchema(RESOLVERS);
  await createDatabaseConnection();
  await createHTTPConnection(schema, process.env.PORT);
};

// Start application
main();
