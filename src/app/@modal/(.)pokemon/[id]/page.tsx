import { Pokemon } from "@/endpointData";
import Modal from "@/app/components/Modal";

export default async function PokemonDetailsModal({
  params,
}: {
  params: { id: string };
}) {
  const details = (await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  ).then((res) => res.json())) as Pokemon;

  return (
    <Modal>
      <h1 className="text-3xl">
        {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
      </h1>
    </Modal>
  );
}
