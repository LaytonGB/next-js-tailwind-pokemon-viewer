import styles from "@/styles";

export default function PokemonTableOptions() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded p-3 my-3">
      <form className="mb-3">
        <label>
          Find Pokemon:
          <input
            type="text"
            className={"form-input w-4/12 " + styles.formField}
            onChange={(event) => setSearchBoxText(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className={styles.buttonPrimary}
          onClick={(event) => {
            event.preventDefault();
            searchForPokemon(searchBoxText.toLowerCase());
          }}
        >
          Search
        </button>
        <button
          type="reset"
          className={styles.buttonSecondary}
          onClick={fetchPokemon}
        >
          Clear
        </button>
      </form>

      <label>
        Results per page:
        <select
          className={"form-select " + styles.formField}
          onChange={(event) => setResultsPerPage(+event.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
}
