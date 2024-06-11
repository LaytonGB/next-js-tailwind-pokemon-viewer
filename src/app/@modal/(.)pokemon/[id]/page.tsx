import Modal from "@/app/components/Modal";
import PokemonDetails from "@/app/components/PokemonDetails";

export default async function PokemonDetailsModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <PokemonDetails id={params.id} bannerClasses="top-0" />
    </Modal>
  );
}
