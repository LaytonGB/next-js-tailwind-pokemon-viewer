"use client";

import Image from "next/image";

import { Pokemon, Type } from "../endpointData";
import { getAllDetails } from "@/pokeApi";
import AlertList, { useAlerts } from "@/components/Alert";
import { useEffect, useState } from "react";

export function PokeApp() {
  const { addAlert } = useAlerts();

  const [offset, setOffset] = useState<number>(0);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  function displayPokemon(): JSX.Element[] {
    return pokemonList.map((pokemon: Pokemon, index: number) => {
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

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemonList = await getAllDetails(resultsPerPage, offset);
        setPokemonList(pokemonList);
      } catch (error) {
        console.error(error);
        addAlert("Failed to fetch Pokémon", "error");
        return [];
      }
    }

    fetchPokemon();
  }, [resultsPerPage, offset]);

  return (
    <div>
      <AlertList />
      <h1>Pokémon Viewer</h1>
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
    </div>
  );
}

export default PokeApp;
