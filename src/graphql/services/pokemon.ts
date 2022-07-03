import {GraphQLContext} from '../../context';

function includeType(pokemon: any) {
  const types = pokemon.pokemon_types.map((pokemonType: any) => {
    return pokemonType.types;
  });

  return {
    ...pokemon,
    types,
  };
}

function includeTypes(pokemons: any) {
  return pokemons.map(includeType);
}

async function getAll(context: GraphQLContext) {
  const pokemons = await context.prisma.pokemon.findMany({
    include: {
      pokemon_types: {
        include: {
          types: true,
        },
      },
    },
  });

  return includeTypes(pokemons);
}

async function getById(id: number, context: GraphQLContext) {
  const pokemon = await context.prisma.pokemon.findUnique({
    where: {
      id,
    },
    include: {
      pokemon_types: {
        include: {
          types: true,
        },
      },
    },
  });

  return includeType(pokemon);
}

async function getByIdentifier(name: string, context: GraphQLContext) {
  const pokemon = await context.prisma.pokemon.findFirst({
    where: {
      identifier: name,
    },
    include: {
      pokemon_types: {
        include: {
          types: true,
        },
      },
    },
  });

  return includeType(pokemon);
}

async function getByType(type: string, context: GraphQLContext) {
  const pokemons = await context.prisma.pokemon.findMany({
    where: {
      pokemon_types: {
        some: {
          types: {
            identifier: type,
          },
        },
      },
    },
    include: {
      pokemon_types: {
        include: {
          types: true,
        },
      },
    },
  });

  return includeTypes(pokemons);
}

export default {
  getAll,
  getById,
  getByIdentifier,
  getByType,
};
