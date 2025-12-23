import { useEffect, useState } from "react";
import { graphqlUrl } from "../lib/api";
import { chrisQuery } from "../lib/graphql";
import type { Chris, QueryResponse } from "../types/chris";

export const useChrisData = () => {
  const [chris, setChris] = useState<Chris | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(graphqlUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: chrisQuery }),
        });
        const json = (await response.json()) as QueryResponse;
        if (!active) return;
        setChris(json.data?.chris ?? null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load data.");
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return { chris, error };
};
