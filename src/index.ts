import {createServer} from '@graphql-yoga/node';
import {schema} from './schema';
import {createContext} from './context';

async function main() {
  const context = await createContext();
  const server = createServer({schema, context});
  server.start();
}

main();
