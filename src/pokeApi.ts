import { PokemonList, PokemonResult } from "./endpointData";
import { Pokemon } from "./endpointData";

export const endpoint = "https://pokeapi.co/api/v2/pokemon";

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
    paramStr = "/" + params;
  }

  let res = await fetch(endpoint + paramStr);
  return await res.json();
}

async function getAll(count: number, offset: number): Promise<PokemonList> {
  return await pokeFetch({ limit: count, offset });
}

async function getOneByIdOrName(idOrName: number | string): Promise<Pokemon> {
  return await pokeFetch([idOrName]);
}

async function getByUrl(url: string): Promise<any> {
  let res = await fetch(url);
  return await res.json();
}

async function getDetailsFromList(list: PokemonList): Promise<Pokemon[]> {
  const pokemonDetails = await Promise.all(
    list.results.map(async (pokemon) => {
      return (await getByUrl(pokemon.url)) as Pokemon;
    })
  );
  return pokemonDetails;
}

async function getNextDetails(
  list: PokemonList
): Promise<[PokemonList, Pokemon[]]> {
  if (!list.next) {
    return [list, []];
  }

  const nextPokemonList = (await getByUrl(list.next)) as PokemonList;
  const nextPokemonDetails = await getDetailsFromList(nextPokemonList);
  return [nextPokemonList, nextPokemonDetails];
}

async function getPrevDetails(
  list: PokemonList
): Promise<[PokemonList, Pokemon[]]> {
  if (!list.previous) {
    return [list, []];
  }

  const prevPokemonList = (await getByUrl(list.previous)) as PokemonList;
  const prevPokemonDetails = await getDetailsFromList(prevPokemonList);
  return [prevPokemonList, prevPokemonDetails];
}

async function getAllDetails(
  count: number,
  offset: number
): Promise<[PokemonList, Pokemon[]]> {
  const pokemonList = await getAll(count, offset);
  const pokemonDetails = await getDetailsFromList(pokemonList);
  return [pokemonList, pokemonDetails];
}

export { getAllDetails, getOneByIdOrName, getNextDetails, getPrevDetails };
