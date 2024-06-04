"use client";

import Image from "next/image";

import { Pokemon, PokemonList, Type } from "../endpointData";
import {
  getAllDetails,
  getNextDetails,
  getOneByName,
  getPrevDetails,
} from "@/pokeApi";
import AlertList, { useAlerts } from "@/components/Alert";
import { useEffect, useState } from "react";

export function PokeApp() {
  const { addAlert } = useAlerts();

  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<PokemonList>(
    {} as PokemonList
  );
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  function displayPokemon(): JSX.Element[] {
    return pokemonDetails.map((pokemon: Pokemon, index: number) => {
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
    });
  }

  async function searchForPokemon(name: string) {
    try {
      const pokemon = await getOneByName(name);
      setPokemonDetails([pokemon]);
    } catch (error) {
      console.error(error);
      addAlert(`No such pokemon, "${searchBoxText}".`, "warning");
    }
  }

  async function prevPage() {
    const [nextList, nextDetails] = await getPrevDetails(pokemonList);
    setPokemonList(nextList);
    setPokemonDetails(nextDetails);
  }

  async function nextPage() {
    const [nextList, nextDetails] = await getNextDetails(pokemonList);
    setPokemonList(nextList);
    setPokemonDetails(nextDetails);
  }

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const [nextPokemonList, nextPokemonDetails] = await getAllDetails(
          resultsPerPage,
          0
        );
        setPokemonList(nextPokemonList);
        setPokemonDetails(nextPokemonDetails);
      } catch (error) {
        console.error(error);
        addAlert("Failed to fetch Pokémon", "error");
        return [];
      }
    }

    fetchPokemon();
  }, [resultsPerPage]);

  return (
    <div>
      <AlertList />

      <h1>Pokémon Viewer</h1>

      <form>
        <label>
          Find Pokemon:
          <input
            type="text"
            onChange={(event) => setSearchBoxText(event.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            searchForPokemon(searchBoxText.toLowerCase());
          }}
        >
          Search
        </button>
        <button type="reset">Clear</button>
      </form>

      <label>
        Results per page:
        <select onChange={(event) => setResultsPerPage(+event.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{displayPokemon()}</tbody>
      </table>

      {pokemonList.previous ? <button onClick={prevPage}>Previous</button> : ""}
      {pokemonList.next ? <button onClick={nextPage}>Next</button> : ""}
    </div>
  );
}

export default PokeApp;
