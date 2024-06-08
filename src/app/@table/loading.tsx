export default function Loading() {
  function displayPokemon(): JSX.Element {
    return (
      <tr className="[&:not(:last-child)]:border-b first:*:last:rounded-bl last:*:last:rounded-br odd:hover:bg-slate-200 dark:odd:hover:bg-slate-800 even:bg-slate-100 even:hover:bg-slate-200 dark:even:bg-slate-900 dark:even:hover:bg-slate-800 cursor-pointer">
        Loading...
      </tr>
    );
  }

  return (
    <div>
      <table className="m-auto w-full">
        <thead className="border-b border-separate">
          <tr className="bg-slate-100 dark:bg-slate-900">
            <th className="rounded-tl w-1/3">Image</th>
            <th className="text-left w-1/3">Name</th>
            <th className="text-left rounded-tr w-1/3">Type</th>
          </tr>
        </thead>
        <tbody>{displayPokemon()}</tbody>
      </table>
    </div>
  );
}
