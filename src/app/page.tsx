import Image from "next/image";

import { PokemonList, PokemonResult, Type } from "./endpointData";

export default async function Home() {
  const offset = 0;
  const resultsPerPage = 10;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${resultsPerPage}&offset=${offset}`
  );
  const pokemonList: PokemonList = await res.json();

  const displayPokemon = (pokemon: PokemonList) => {
    return pokemon.results.map(
      async (pokemonResult: PokemonResult, index: number) => {
        const res = await fetch(pokemonResult.url);
        const pokemon = await res.json();

        return (
          <tr key={index}>
            <td>
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={pokemon.name}
              />
            </td>
            <td>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </td>
            <td>
              {pokemon.types
                .map(
                  (type: Type) =>
                    type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)
                )
                .reduce((a: string, b: string) => a + " / " + b)}
            </td>
          </tr>
        );
      }
    );
  };

  return (
    <div>
      <h1>Pokémon Viewer</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{displayPokemon(pokemonList)}</tbody>
      </table>
    </div>
  );
}
