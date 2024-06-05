import { useEffect, useState } from "react";

interface PokemonDetailsDisplayProps {
  url: string;
}

export default function PokemonDetailsDisplay({
  url,
}: PokemonDetailsDisplayProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);

  function displayProperties(data: (string | Object)[] | Object): JSX.Element {
    if (data === null) {
      return <></>;
    }

    // TODO clean
    // collapsible sections instead?
    // custom layout would be better than automated
    return (
      <ul className="ml-3">
        {Array.isArray(data)
          ? data.map((value, key) => {
              return (
                <div key={key}>
                  {value instanceof Object ? displayProperties(value) : value}
                </div>
              );
            })
          : Object.entries(data)
              .filter(([key, value]) => key !== "url")
              .map(([key, value]) => {
                return (
                  <li key={key} className="list-item">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                    {value instanceof Object ? (
                      displayProperties(value)
                    ) : String(value).includes("http") ? (
                      <a href={value} className="text-blue-500">
                        {value}
                      </a>
                    ) : (
                      String(value).charAt(0).toUpperCase() +
                      String(value).slice(1)
                    )}
                  </li>
                );
              })}
      </ul>
    );
  }

  return <>{isLoading ? "Loading..." : displayProperties(data)}</>;
}
