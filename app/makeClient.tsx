import { HttpLink } from "@apollo/client/index.js";
import { ApolloClient, InMemoryCache } from "@apollo/client-react-streaming";

export function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    }),
  });
}
