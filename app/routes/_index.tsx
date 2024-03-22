import type { MetaFunction } from "@remix-run/node";
import { gql, useSuspenseQuery } from "@apollo/client/index.js";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const ALL_FILMS = gql`
  query Query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Suspense fallback="loading">
        <Suspended />
      </Suspense>
    </div>
  );
}

function Suspended() {
  const { data } = useSuspenseQuery(ALL_FILMS);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}
