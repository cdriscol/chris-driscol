import { useQuery } from "@tanstack/react-query";
import { graphql } from "../generated/graphql";
import { execute } from "../generated/graphql/execute";

const AppQueryDocument = graphql(/* GraphQL */ `
  query AppQuery {
    chris {
      id
      title
      description
      about {
        ...AboutSection
      }
      experience {
        ...ExperienceItem
      }
      skills {
        ...SkillsSection
      }
      work {
        ...PortfolioCard
        ...PortfolioModal
      }
      social {
        ...SiteNavSocial
        ...FooterSocial
      }
    }
  }
`);

export const useChrisData = () => {
  const { data, error } = useQuery({
    queryKey: ["chris"],
    queryFn: () => execute(AppQueryDocument),
  });

  return {
    data,
    error: error instanceof Error ? error.message : error ? "Failed to load data." : null,
  };
};
