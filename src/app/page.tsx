import PokemonTable from "./@table/page";

export default async function PokeApp({
  params,
}: {
  params: { resultsPerPage?: string; pageNumber?: string };
}) {
  const resultsPerPage =
    (params.resultsPerPage && parseInt(params.resultsPerPage)) || 10;
  const pageNumber = (params.pageNumber && parseInt(params.pageNumber)) || 1;

  return (
    <div className="my-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 place-self-center">
      <h1 className="text-4xl font-bold mb-4">Pokémon Viewer</h1>
      <PokemonTable resultsPerPage={resultsPerPage} pageNumber={pageNumber} />
    </div>
  );
}
