/* eslint-disable @typescript-eslint/ban-types */

import * as chalk from 'chalk';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { setupAuth } from './setup-auth';

export const createSchema = async (resolvers: NonEmptyArray<Function>) => {
  process.stdout.write(' 🗺️ GraphQL  ');

  try {
    const schema = await buildSchema({
      resolvers,
      emitSchemaFile: true,
      validate: false,
      dateScalarMode: 'isoDate',
      authChecker: setupAuth,
    });

    process.stdout.write(chalk.green('OK ✔️\n'));
    return schema;
  } catch (err) {
    process.stdout.write(chalk.red('FAIL ❌\n' + err));
    process.exit();
  }
};
