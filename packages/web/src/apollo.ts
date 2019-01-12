import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://localhost:4000",
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

export { client };
