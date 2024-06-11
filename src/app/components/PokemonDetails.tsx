import Image from "next/image";

import { Pokemon } from "@/endpointData";

export default async function PokemonDetails({
  id,
  bannerClasses,
}: {
  id: string | number;
  bannerClasses?: string;
}) {
  const details = (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (res) => res.json()
  )) as Pokemon;

  return (
    <div className="flex flex-col">
      <div
        className={
          "flex flex-row place-items-center gap-5 bg-slate-700 border-b border-slate-500 p-5 sticky" +
          (!!bannerClasses ? " " + bannerClasses : "")
        }
      >
        <Image
          src={details.sprites.front_default}
          alt={details.name}
          width={128}
          height={128}
          className="bg-slate-900 rounded-full"
        />
        <div className="flex flex-col justify-around">
          <h1 className="text-6xl mb-3">
            {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
          </h1>
          <div className="flex flex-col gap-1">
            <span className="text-xl">ID: {details.id}</span>
            <span className="text-xl">
              Type:{" "}
              {details.types
                .map(
                  (t) =>
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                )
                .join(" / ")}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-4xl py-3">Moves</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense pl-5">
            {details.moves
              .map(
                (move) =>
                  move.move.name.charAt(0).toUpperCase() +
                  move.move.name.slice(1)
              )
              .toSorted()
              .map((move) => (
                <span key={move}>{move}</span>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl py-3">Abilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row-dense pl-5">
            {details.abilities
              .map(
                (ability) =>
                  ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1)
              )
              .toSorted()
              .map((ability) => (
                <span key={ability}>{ability}</span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
