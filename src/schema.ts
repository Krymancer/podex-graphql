import {makeExecutableSchema} from '@graphql-tools/schema';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
});
