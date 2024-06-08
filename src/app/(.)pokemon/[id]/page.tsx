import Modal from "@/app/components/Modal";

import PokeApp from "@/app/page";
import PokemonDetails from "@/app/pokemon/[id]/page";

export default function Pokemon(props: { params: { id: string } }) {
  return (
    <>
      <PokeApp />
      <Modal>
        <PokemonDetails {...props} />
      </Modal>
    </>
  );
}
