import {GraphQLContext} from '../../context';
import services from '../services';

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
    createPokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.createPokemon(args.input, context),
    deletePokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.removePokemon(args.id, context),
    updatePokemon: async (parent: unknown, args: PokemonArguments, context : GraphQLContext) => await services.pokemonService.updatePokemon(args, context),
  },
};

export default pokemonResolver;
