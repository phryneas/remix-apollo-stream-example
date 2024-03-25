import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  createQueryPreloader,
  gql,
  useApolloClient,
  useSuspenseQuery,
} from "@apollo/client/index.js";
import { Suspense } from "react";
import {
  ClientLoaderFunctionArgs,
  defer,
  useLoaderData,
} from "@remix-run/react";
import { apolloLoader, makeClient } from "~/makeClient";

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

function middleware(bar: { query: any; variables: any; result: Promise<any> }) {
  return {
    bar: { query, variables },
    bar__promise: result,
  };
}

export const loader = apolloLoader(async ({ preload }) => {
  // we could get around this if we could add dehydration logic to `defer` on a framework level
  return apolloLoader.defer({
    bar: preload(ALL_FILMS),
    baz: await preload(ALL_FILMS).toPromise(),
    boo: preload(ALL_FILMS).toPromise(), // runtime warning for this
  });
  return preload(ALL_FILMS);
  return preload(ALL_FILMS).toPromise();
});

export const _loader = ({ context }: LoaderFunctionArgs) => {
  const loader = createQueryPreloader(makeClient(context));

  return defer(
    middleware({
      bar: loader(ALL_FILMS),
      // ==>
      // bar: {
      //   query: ALL_FILMS,
      //   variables: {},
      //   result: client.query(ALL_FILMS),
      //   async toPromise() {
      //    return { query, variables, result: await this.result }
      //   }
      // },
      foo: Promise.resolve("asd"),
    })
  );
};

// export const clientLoader = ({serverLoader, context}: ClientLoaderFunctionArgs) => {
//   return {}
// }

function useApolloLoaderData() {
  // we could get around this if we could add useApolloClient logic to `defer` on a framework level
  const client = useApolloClient();
  client.simulateQuery({ query, variables });
  dataPromise.then((result) =>
    client.simulateResult({ query, variables, result })
  );
  const realPreloader = createQueryPreloader(client);
  return realPreloader(query, { variables });
}

export default function Index() {
  const { foo, bar } = useApolloResult(useLoaderData<typeof loader>());
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
