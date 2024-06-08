import Link from "next/link";

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
        <Link
          href={`/?resultPerPage=${resultsPerPage}&pageNumber=${
            pageNumber - 1
          }`}
          className={styles.buttonPrimary + " " + paddingStyle}
        >
          Previous
        </Link>
      ) : (
        <span className={paddingStyle} />
      )}
      {next ? (
        <Link
          href={`/?resultPerPage=${resultsPerPage}&pageNumber=${
            pageNumber + 1
          }`}
          className={styles.buttonPrimary + " " + paddingStyle}
        >
          Next
        </Link>
      ) : (
        <span className={paddingStyle} />
      )}
    </div>
  );
}
