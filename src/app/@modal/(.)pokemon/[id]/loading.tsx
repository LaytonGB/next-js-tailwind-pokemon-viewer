import Modal from "@/app/components/Modal";
import LoadingPokemonDetails from "@/app/pokemon/[id]/loading";

export default function LoadingPokemonDetailsModal() {
  return (
    <Modal>
      <LoadingPokemonDetails />
    </Modal>
  );
}
