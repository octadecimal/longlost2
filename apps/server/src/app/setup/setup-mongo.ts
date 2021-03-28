import { mongoose } from '@typegoose/typegoose';
import * as chalk from 'chalk';

export const createDatabaseConnection = async () => {
  try {
    process.stdout.write(' 🛰️ Database ');

    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
      useFindAndModify: false,
    });

    process.stdout.write(chalk.green('OK ✔️\n'));
  } catch (err) {
    process.stdout.write(chalk.red('FAIL ❌\n'));
    console.log('Error: ' + err);
    console.log('Retrying...');
    setTimeout(() => createDatabaseConnection(), 5000);
  }
};
