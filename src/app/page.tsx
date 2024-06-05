"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Pokemon, PokemonList, PokemonType } from "../endpointData";
import {
  getAllDetails,
  getNextDetails,
  getOneByIdOrName,
  getPrevDetails,
} from "@/pokeApi";
import { useAlerts } from "@/components/Alert";
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
  const router = useRouter();

  const { addAlert } = useAlerts();

  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<PokemonList>(
    {} as PokemonList
  );
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [currentlyFetching, setCurrentlyFetching] = useState<boolean>(false);

  const imageSize = 100;

  function displayPokemon(): JSX.Element[] {
    return pokemonDetails.map((pokemon: Pokemon, index: number) => {
      return (
        <tr
          key={index}
          className="[&:not(:last-child)]:border-b first:*:last:rounded-bl last:*:last:rounded-br odd:hover:bg-slate-200 dark:odd:hover:bg-slate-800 even:bg-slate-100 even:hover:bg-slate-200 dark:even:bg-slate-900 dark:even:hover:bg-slate-800 cursor-pointer"
          onClick={() => router.push(`/${pokemon.name}`)}
        >
          <td>
            <Image
              src={pokemon.sprites.front_default}
              width={imageSize}
              height={imageSize}
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
                (type: PokemonType) =>
                  type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)
              )
              .reduce((a: string, b: string) => a + " / " + b)}
          </td>
        </tr>
      );
    });
  }

  function displayLoading(): JSX.Element[] {
    return Array.from({ length: resultsPerPage }, (_, index) => (
      <tr
        key={index}
        style={{ height: imageSize + "px" }}
        className="[&:not(:last-child)]:border-b first:*:last:rounded-bl last:*:last:rounded-br even:bg-slate-100 dark:even:bg-slate-900"
      >
        <td key={index} colSpan={3} className="text-center">
          Loading...
        </td>
      </tr>
    ));
  }

  async function searchForPokemon(name: string) {
    if (!name) {
      addAlert("Please enter a Pokémon name.", "warning");
      return;
    }

    setCurrentlyFetching(true);
    try {
      const pokemon = await getOneByIdOrName(name);
      setPokemonDetails([pokemon]);
    } catch (error) {
      console.error(error);
      addAlert(`No such pokemon, "${searchBoxText}".`, "warning");
    }
    setCurrentlyFetching(false);
  }

  async function prevPage() {
    setCurrentlyFetching(true);
    const [nextList, nextDetails] = await getPrevDetails(pokemonList);
    setPokemonList(nextList);
    setPokemonDetails(nextDetails);
    setCurrentlyFetching(false);
  }

  async function nextPage() {
    setCurrentlyFetching(true);
    const [nextList, nextDetails] = await getNextDetails(pokemonList);
    setPokemonList(nextList);
    setPokemonDetails(nextDetails);
    setCurrentlyFetching(false);
  }

  async function fetchPokemon() {
    setCurrentlyFetching(true);
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
    }
    setCurrentlyFetching(false);
  }

  useEffect(() => {
    fetchPokemon();
  }, [resultsPerPage]);

  return (
    <div className="my-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 place-self-center">
      <h1 className="text-4xl font-bold mb-4">Pokémon Viewer</h1>

      <div className="bg-slate-200 dark:bg-slate-800 rounded p-3 my-3">
        <form className="mb-3">
          <label>
            Find Pokemon:
            <input
              type="text"
              className={"form-input w-4/12 " + styles.formField}
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

      <table className="m-auto w-full">
        <thead className="border-b border-separate">
          <tr className="bg-slate-100 dark:bg-slate-900">
            <th className="rounded-tl w-1/3">Image</th>
            <th className="text-left w-1/3">Name</th>
            <th className="text-left rounded-tr w-1/3">Type</th>
          </tr>
        </thead>
        <tbody>{currentlyFetching ? displayLoading() : displayPokemon()}</tbody>
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
