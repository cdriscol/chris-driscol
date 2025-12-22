const defaultLocalGraphqlUrl = "http://localhost:3000/graphql";
const defaultProdGraphqlUrl = "https://api.chrisdriscol.com/graphql";

export const graphqlUrl =
  import.meta.env.VITE_GRAPHQL_URL ??
  (import.meta.env.DEV ? defaultLocalGraphqlUrl : defaultProdGraphqlUrl);
