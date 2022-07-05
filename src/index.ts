import {createServer} from '@graphql-yoga/node';
import {makeExecutableSchema} from '@graphql-tools/schema';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

const schema = makeExecutableSchema({typeDefs, resolvers});

async function main() {
  const server = createServer({schema});
  server.start();
}

main();
