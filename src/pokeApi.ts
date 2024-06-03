import { PokemonList, PokemonResult } from "./endpointData";
import { Pokemon } from "./endpointData";

const url = "https://pokeapi.co/api/v2/pokemo";

async function pokeFetch(params: (string | number)[]): Promise<Pokemon>;
async function pokeFetch(params: {
  [key: string]: string | number;
}): Promise<PokemonList>;
async function pokeFetch(
  params: (string | number)[] | { [key: string]: string | number }
): Promise<any> {
  let paramStr: string;
  if (Array.isArray(params)) {
    paramStr = "/" + params.join("/");
  } else if (typeof params === "object") {
    let query = Object.entries(params)
      .map(([key, val]) => key + "=" + val)
      .join("&");
    paramStr = "?" + query;
  } else {
    throw new Error("Invalid parameter type");
  }

  let res = await fetch(url + paramStr);
  return await res.json();
}

async function getAll(count: number, offset: number): Promise<PokemonList> {
  return await pokeFetch({ limit: count, offset });
}

async function getOneByUrl(url: string): Promise<Pokemon> {
  let res = await fetch(url);
  return await res.json();
}

async function getAllDetails(
  count: number,
  offset: number
): Promise<Pokemon[]> {
  const pokemonList = await getAll(count, offset);
  const pokemonDetails = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      return await getOneByUrl(pokemon.url);
    })
  );
  return pokemonDetails;
}

export { getAllDetails };
