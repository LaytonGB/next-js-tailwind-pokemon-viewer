import Modal from "@/app/components/Modal";

import PokemonDetails from "@/app/pokemon/[id]/page";

export default function Pokemon(props: { params: { id: string } }) {
  return (
    <Modal>
      <PokemonDetails {...props} />
    </Modal>
  );
}
