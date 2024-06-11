import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingPokemonTableEntry({
  resultsPerPage,
}: {
  resultsPerPage: number;
}) {
  function displayPokemon(): JSX.Element[] {
    return new Array(resultsPerPage).fill(null).map((_, index: number) => {
      return (
        <tr
          key={index}
          className="[&:not(:last-child)]:border-b first:*:last:rounded-bl last:*:last:rounded-br even:bg-slate-100 dark:even:bg-slate-900"
        >
          <td className="text-center">
            <Skeleton width={100} height={100} circle />
          </td>
          <td>
            <Skeleton width={200} height="1.25rem" />
          </td>
          <td>
            <Skeleton width={200} height="1.25rem" />
          </td>
        </tr>
      );
    });
  }

  return displayPokemon();
}
