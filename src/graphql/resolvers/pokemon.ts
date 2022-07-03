import {GraphQLContext} from '../../context';
import services from '../services';

type Args = {
  identifier: string;
  id: number;
  type: string;
}

/* eslint-disable max-len */
const pokemonResolver = {
  Query: {
    pokemons: async (parent: unknown, args: Args, context : GraphQLContext) => await services.pokemonService.getAll(context),
    pokemon: async (parent: unknown, args: Args, context : GraphQLContext) => await services.pokemonService.getById(args.id, context),
    pokemonByIdentifier: async (parent: unknown, args: Args, context : GraphQLContext) => await services.pokemonService.getByIdentifier(args.identifier, context),
    pokemonsByType: async (parent: unknown, args: Args, context : GraphQLContext) => await services.pokemonService.getByType(args.type, context),
  },
};

export default pokemonResolver;
