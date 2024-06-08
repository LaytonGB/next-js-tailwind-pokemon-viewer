"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Pokemon, PokemonType } from "@/endpointData";

export default function PokemonTableEntries({
  pokemonDetails,
}: {
  pokemonDetails: Pokemon[];
}) {
  const router = useRouter();

  const imageSize = 100;

  function displayPokemon(): JSX.Element[] {
    return pokemonDetails.map((pokemon: Pokemon, index: number) => {
      return (
        <tr
          key={index}
          className="[&:not(:last-child)]:border-b first:*:last:rounded-bl last:*:last:rounded-br odd:hover:bg-slate-200 dark:odd:hover:bg-slate-800 even:bg-slate-100 even:hover:bg-slate-200 dark:even:bg-slate-900 dark:even:hover:bg-slate-800 cursor-pointer"
          onClick={() => router.replace(`/pokemon/${pokemon.id}`)}
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

  return displayPokemon();
}
