import {GraphQLContext} from '../../context';
import {PokemonInput, PokemonArguments} from '../resolvers/pokemon';

async function getAll(context: GraphQLContext) {
  return await context.prisma.pokemon.findMany({});
}

async function getById(id: number, context: GraphQLContext) {
  return await context.prisma.pokemon.findUnique({
    where: {id},
  });
}

async function getByName(name: string, context: GraphQLContext) {
  return await context.prisma.pokemon.findFirst({
    where: {name},
  });
}

async function getByType(type: string, context: GraphQLContext) {
  return await context.prisma.pokemon.findMany({
    where: {
      types: {
        contains: type,
      },
    }});
}

async function createPokemon(input: PokemonInput, context : GraphQLContext) {
  return await context.prisma.pokemon.create({
    data: {
      name: input.name,
      weight: input.weight,
      height: input.height,
      base_xp: input.base_xp,
      types: input.types,
    },
  });
}

async function removePokemon(id: number, context : GraphQLContext) {
  return await context.prisma.pokemon.delete({
    where: {
      id,
    },
  });
}

async function updatePokemon(
    args: PokemonArguments,
    context : GraphQLContext) {
  const {id, input} = args;
  return await context.prisma.pokemon.update({
    where: {
      id,
    },
    data: {
      name: input.name,
      weight: input.weight,
      height: input.height,
      base_xp: input.base_xp,
      types: input.types,
    },
  });
}

export default {
  getAll,
  getById,
  getByName,
  getByType,
  createPokemon,
  removePokemon,
  updatePokemon,
};
