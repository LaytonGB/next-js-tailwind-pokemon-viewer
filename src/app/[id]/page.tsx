"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Pokemon } from "@/endpointData";
import { useAlerts } from "@/components/Alert";
import { endpoint, getOneByIdOrName } from "@/pokeApi";
import PokemonDetailsDisplay from "@/components/PokemonDetailsDisplay";

export default function PokemonDetails(): JSX.Element {
  const router = useRouter();
  const { id } = useParams();
  const { addAlert } = useAlerts();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<null | Pokemon>(null);

  function displayPokemon(pokemon: Pokemon): JSX.Element {
    return (
      <div>
        <div className="flex flex-row align-text-bottom">
          <Image
            src={pokemon.sprites.front_default}
            width={100}
            height={100}
            alt={pokemon.name}
          />
          <h2 className="text-3xl place-self-center">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
        </div>
        <PokemonDetailsDisplay url={endpoint + "/" + pokemon.name} />
      </div>
    );
  }

  useEffect(() => {
    if (id === undefined) {
      addAlert("No ID provided for Pokemon", "warning");
      router.push("/");
    }

    getOneByIdOrName(id as string)
      .then((data) => {
        setPokemon(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        addAlert("Error fetching Pokemon", "error");
        router.push("/");
      });
  }, [id]);

  return (
    <div className="my-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 place-self-center">
      {isLoading ? (
        "Loading..."
      ) : (
        <h1 className="text-4xl font-bold mb-4">Pokemon Details</h1>
      )}
      {pokemon !== null && displayPokemon(pokemon)}
    </div>
  );
}
