import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/graphql/generated";
import { execute } from "@/graphql/execute";

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

export const useAppQuery = () => {
  const { data, error } = useQuery({
    queryKey: ["chris"],
    queryFn: () => execute(AppQueryDocument),
  });

  return {
    data,
    error: error instanceof Error ? error.message : error ? "Failed to load data." : null,
  };
};
