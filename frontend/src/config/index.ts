export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
export const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || API_URL + "/graphql";
