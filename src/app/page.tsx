import PokemonTable from "./@table/page";

export default async function PokeApp({
  searchParams,
}: {
  searchParams?: { [param: string]: string | string[] | undefined };
}) {
  const resultsPerPage = parseInt(
    searchParams?.resultsPerPage?.toString() ?? "10"
  );
  const pageNumber = parseInt(searchParams?.pageNumber?.toString() ?? "1");

  return (
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 place-self-center">
      <h1 className="text-4xl font-bold mb-4">Pokémon Viewer</h1>
      <PokemonTable resultsPerPage={resultsPerPage} pageNumber={pageNumber} />
    </div>
  );
}
