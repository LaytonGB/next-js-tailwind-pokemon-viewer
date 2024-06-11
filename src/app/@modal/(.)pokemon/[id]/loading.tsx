import Modal from "@/app/components/Modal";
import UnwrappedLoading from "@/app/pokemon/[id]/loading";

export default function Loading() {
  return (
    <Modal>
      <UnwrappedLoading />
    </Modal>
  );
}
