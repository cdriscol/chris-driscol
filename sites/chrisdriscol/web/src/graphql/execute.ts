import { graphqlUrl } from "./api";
import type { TypedDocumentString } from "../graphql/generated/graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = (await response.json()) as {
    data?: TResult;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL request failed.");
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data.");
  }

  return json.data;
}
