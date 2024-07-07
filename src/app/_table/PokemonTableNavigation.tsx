import styles from "@/app/styles";

export default function PokemonTableNavigation({
  resultsPerPage,
  pageNumber,
  previous,
  next,
}: {
  resultsPerPage: number;
  pageNumber: number;
  previous: boolean;
  next: boolean;
}) {
  const paddingStyle = "w-24 mx-5";

  return (
    <div className="flex justify-center">
      {previous ? (
        <a
          href={`/?resultPerPage=${resultsPerPage}&pageNumber=${
            pageNumber - 1
          }`}
          className={styles.buttonPrimary + " " + paddingStyle}
        >
          Previous
        </a>
      ) : (
        <span className={paddingStyle} />
      )}
      {next ? (
        <a
          href={`/?resultPerPage=${resultsPerPage}&pageNumber=${
            pageNumber + 1
          }`}
          className={styles.buttonPrimary + " " + paddingStyle}
        >
          Next
        </a>
      ) : (
        <span className={paddingStyle} />
      )}
    </div>
  );
}
