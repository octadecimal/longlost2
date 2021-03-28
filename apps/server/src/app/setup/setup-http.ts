import * as cors from 'cors';
import * as chalk from 'chalk';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import * as jwt from 'express-jwt';
import { createServer } from 'http';

export const createHTTPConnection = async (schema: GraphQLSchema, port: string) => {
  process.stdout.write(' 📡 HTTP      ');

  return new Promise<ApolloServer>((resolve, reject) => {
    const server = new ApolloServer({
      schema,
      tracing: true,
      playground: true,
      context: ({ req }) => {
        const context = {
          req,
          user: req?.user,
          token: req?.token,
        };
        return context;
      },
    });

    const app = express();
    const path = '/graphql';

    const http = createServer(app);

    app.use(cors());

    app.use(
      path,
      jwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false,
        algorithms: ['HS256'],
      })
    );

    server.applyMiddleware({ app, path });
    server.installSubscriptionHandlers(http);

    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(200).json({ errors: [{ message: 'Unauthorized', debug: err }] });
      }
    });

    app.on('error', err => {
      process.stderr.write(chalk.red('FAIL ❌\n'));
      console.log(err);
      reject(err);
      process.exit();
    });

    http.listen(process.env.PORT || port, () => {
      process.stdout.write(chalk.green('OK ✔️\n'));
      resolve(server);
    });
  });
};
