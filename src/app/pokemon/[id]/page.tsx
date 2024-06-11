import PokemonDetails from "@/app/components/PokemonDetails";

export default function Page({ params }: { params: { id: string } }) {
  return PokemonDetails({ id: params.id, bannerClasses: "top-14" });
}
