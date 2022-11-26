import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from ".";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: GRAPHQL_URL });

/** Middleware for setting authorization header */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: GRAPHQL_URL,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
