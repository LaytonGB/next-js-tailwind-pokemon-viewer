import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingPokemonTableEntry from "./@entries/loading";

export default function LoadingPokemonTable({
  resultsPerPage,
}: {
  resultsPerPage: number;
}) {
  return (
    <SkeletonTheme baseColor="#4B5563" highlightColor="#667284">
      <table className="m-auto w-full">
        <thead className="border-b border-separate">
          <tr className="bg-slate-100 dark:bg-slate-900">
            <th className="rounded-tl w-1/3">Image</th>
            <th className="text-left w-1/3">Name</th>
            <th className="text-left rounded-tr w-1/3">Type</th>
          </tr>
        </thead>
        <tbody>
          <LoadingPokemonTableEntry resultsPerPage={resultsPerPage} />
        </tbody>
      </table>
    </SkeletonTheme>
  );
}
