const defaultLocalGraphqlUrl = "/graphql";
const defaultProdGraphqlUrl = "https://api.chrisdriscol.com/graphql";

export const graphqlUrl =
  import.meta.env.VITE_GRAPHQL_URL ??
  (import.meta.env.DEV ? defaultLocalGraphqlUrl : defaultProdGraphqlUrl);
