export default async function PokemonDetails({
  params,
}: {
  params: { id: string };
}) {
  const details = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  ).then((res) => res.json());

  return (
    <div>
      <h1 className="text-3xl">{details.name}</h1>
    </div>
  );
}
