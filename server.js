

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { typeDefs,resolvers } from './src/graphql/index.js';
import connectDB from './src/config/db.js';
//import { Jwt } from 'jsonwebtoken';


// for env file
config();


const app = express();

connectDB();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/api',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => (req),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: process.env.HOST_PORT }, resolve));

console.log(`Apollo server is listening at ${process.env.HOST_PORT} port`);