import Modal from "@/app/components/Modal";
import PokemonDetails from "@/app/pokemon/[id]/page";

export default async function PokemonDetailsModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <PokemonDetails params={params} />
    </Modal>
  );
}
