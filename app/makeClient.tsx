import { HttpLink, createQueryPreloader } from "@apollo/client/index.js";
import { ApolloClient, InMemoryCache } from "@apollo/client-react-streaming";
import { LoaderFunction, LoaderFunctionArgs, defer } from "@remix-run/node";

export function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    }),
  });
}

type In = LoaderFunctionArgs & {
  preload: ReturnType<typeof createQueryPreloader>;
};
type LoaderCreator = (<T>(
  fn: (args: In) => T
) => (args: LoaderFunctionArgs) => T) & { defer: typeof defer };
// pattern similar to https://github.com/kirill-konshin/next-redux-wrapper?tab=readme-ov-file#getstaticprops
declare function makeLoaderCreator(make: typeof makeClient): LoaderCreator;

export const apolloLoader = makeLoaderCreator(makeClient);
