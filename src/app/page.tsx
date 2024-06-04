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

const styles = {
  buttonPrimary:
    "m-2 p-2 bg-blue-300 dark:bg-blue-700 text-black dark:text-white rounded border border-blue-900 hover:border-blue-400",
  buttonSecondary:
    "m-2 p-2 bg-slate-300 dark:bg-slate-700 text-black dark:text-white rounded border border-slate-900 hover:border-slate-400",
  formField:
    "text-black dark:text-white bg-gray-300 dark:bg-gray-700 mx-2 rounded p-1",
};

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
              className="m-auto"
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
    if (!name) {
      addAlert("Please enter a Pokémon name.", "warning");
      return;
    }

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

  useEffect(() => {
    fetchPokemon();
  }, [resultsPerPage]);

  return (
    <div className="w-5/6 my-8">
      <AlertList />

      <h1 className="text-4xl font-bold mb-4">Pokémon Viewer</h1>

      <div className="bg-slate-200 dark:bg-slate-800 rounded p-3 my-3">
        <form className="mb-3">
          <label>
            Find Pokemon:
            <input
              type="text"
              className={"form-input " + styles.formField}
              onChange={(event) => setSearchBoxText(event.target.value)}
            />
          </label>
          <button
            type="submit"
            className={styles.buttonPrimary}
            onClick={(event) => {
              event.preventDefault();
              searchForPokemon(searchBoxText.toLowerCase());
            }}
          >
            Search
          </button>
          <button
            type="reset"
            className={styles.buttonSecondary}
            onClick={fetchPokemon}
          >
            Clear
          </button>
        </form>

        <label>
          Results per page:
          <select
            className={"form-select " + styles.formField}
            onChange={(event) => setResultsPerPage(+event.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>

      <table className="m-auto w-96 border-spacing-x-4">
        <thead>
          <tr>
            <th>Image</th>
            <th className="text-left">Name</th>
            <th className="text-left">Type</th>
          </tr>
        </thead>
        <tbody>{displayPokemon()}</tbody>
      </table>

      <div className="flex justify-center">
        {pokemonList.previous ? (
          <button
            className={styles.buttonPrimary + " w-20 mx-5"}
            onClick={prevPage}
          >
            Previous
          </button>
        ) : (
          <span className="w-20 mx-5" />
        )}
        {pokemonList.next ? (
          <button
            className={styles.buttonPrimary + " w-20 mx-5"}
            onClick={nextPage}
          >
            Next
          </button>
        ) : (
          <span className="w-20 mx-5" />
        )}
      </div>
    </div>
  );
}

export default PokeApp;
