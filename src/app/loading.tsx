import LoadingPokemonTable from "@/app/_table/LoadingPokemonTableEntry";

export default function LoadingPokeApp({
  searchParams,
}: {
  searchParams?: { [param: string]: string | string[] | undefined };
}) {
  const resultsPerPage = parseInt(
    searchParams?.resultsPerPage?.toString() ?? "10"
  );

  return (
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 place-self-center pt-8">
      <h1 className="text-4xl font-bold mb-4">Pokémon Viewer</h1>
      <LoadingPokemonTable resultsPerPage={resultsPerPage} />
    </div>
  );
}
