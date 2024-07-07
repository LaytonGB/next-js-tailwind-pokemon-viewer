import { Pokemon, PokemonList, PokemonResult } from "@/endpointData";
import PokemonTableNavigation from "./PokemonTableNavigation";
import PokemonTableEntries from "./Entries";

export default async function PokemonTable({
  resultsPerPage,
  pageNumber,
}: {
  resultsPerPage: number;
  pageNumber: number;
}) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${resultsPerPage}&offset=${
    resultsPerPage * (pageNumber - 1)
  }`;

  const pokemonList = (await fetch(url).then((response) =>
    response.json()
  )) as PokemonList;

  const pokemonDetails: Pokemon[] = await Promise.all(
    pokemonList.results.map((pokemon: PokemonResult) =>
      fetch(pokemon.url).then((response) => response.json())
    )
  );

  return (
    <div>
      <table className="m-auto w-full">
        <thead className="border-b border-separate">
          <tr className="bg-slate-100 dark:bg-slate-900">
            <th className="rounded-tl w-1/3">Image</th>
            <th className="text-left w-1/3">Name</th>
            <th className="text-left rounded-tr w-1/3">Type</th>
          </tr>
        </thead>
        <tbody>
          <PokemonTableEntries pokemonDetails={pokemonDetails} />
        </tbody>
      </table>

      <PokemonTableNavigation
        resultsPerPage={resultsPerPage}
        pageNumber={pageNumber}
        previous={!!pokemonList.previous}
        next={!!pokemonList.next}
      />
    </div>
  );
}
