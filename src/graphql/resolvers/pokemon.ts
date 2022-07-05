import {createPubSub} from '@graphql-yoga/node';
import {GraphQLContext} from '../../context';
import services from '../services';

const pokeSub = createPubSub();


type Args = {
  id: number;
  name: string;
  type: string;
  input: PokemonInput;
}

export type PokemonInput = {
  name: string;
  height: number;
  weight: number;
  base_xp: number;
  species: string;
  types: string;
}

export interface PokemonArguments extends Args, PokemonInput {}

/* eslint-disable max-len */
const pokemonResolver = {
  Query: {
    pokemons: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.getAll(context),
    pokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.getById(args.id, context),
    pokemonByName: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.getByName(args.name, context),
    pokemonsByType: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.getByType(args.type, context),
  },
  Mutation: {
    createPokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => {
      const pokemon = await services.pokemonService.createPokemon(args.input, context);
      pokeSub.publish('pokemonCreated', {pokemonCreated: pokemon});
      return pokemon;
    },
    deletePokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.removePokemon(args.id, context),
    updatePokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.updatePokemon(args, context),
  },
  Subscription: {
    pokemonCreated: {
      subscribe: () => pokeSub.subscribe('pokemonCreated'),
    },
  },
};

export default pokemonResolver;
