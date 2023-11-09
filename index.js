import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/schema.js';
import { resolvers } from './resolvers/resolvers.js';

const API_PORT = process.env.API_PORT || 8080;

export const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: API_PORT },
});

console.log(`server is listening at ${API_PORT}`);
