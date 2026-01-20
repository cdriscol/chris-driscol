/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AboutSection on About {\n    description\n    imageUrl\n    imageCaption\n    imageTitle\n    tagLine\n  }\n": typeof types.AboutSectionFragmentDoc,
    "\n  mutation ContactMe($input: ContactMeInput!) {\n    contactMe(input: $input) {\n      success\n    }\n  }\n": typeof types.ContactMeDocument,
    "\n  fragment ExperienceItem on Experience {\n    duration\n    title\n    location\n    description\n    imageUrl\n  }\n": typeof types.ExperienceItemFragmentDoc,
    "\n  fragment FooterSocial on Social {\n    linkedIn\n    github\n    email\n  }\n": typeof types.FooterSocialFragmentDoc,
    "\n  fragment PortfolioCard on Work {\n    title\n    subTitle\n    location\n    link\n    date\n    imageUrl\n  }\n": typeof types.PortfolioCardFragmentDoc,
    "\n  fragment PortfolioModal on Work {\n    title\n    subTitle\n    description\n    location\n    link\n    video\n    date\n    imageUrl\n    technologies\n  }\n": typeof types.PortfolioModalFragmentDoc,
    "\n  fragment SkillsSection on Skills {\n    languages\n    technologies\n    tools\n    loves\n  }\n": typeof types.SkillsSectionFragmentDoc,
    "\n  fragment SiteNavSocial on Social {\n    linkedIn\n    github\n  }\n": typeof types.SiteNavSocialFragmentDoc,
    "\n  query AppQuery {\n    chris {\n      id\n      title\n      description\n      about {\n        ...AboutSection\n      }\n      experience {\n        ...ExperienceItem\n      }\n      skills {\n        ...SkillsSection\n      }\n      work {\n        ...PortfolioCard\n        ...PortfolioModal\n      }\n      social {\n        ...SiteNavSocial\n        ...FooterSocial\n      }\n    }\n  }\n": typeof types.AppQueryDocument,
};
const documents: Documents = {
    "\n  fragment AboutSection on About {\n    description\n    imageUrl\n    imageCaption\n    imageTitle\n    tagLine\n  }\n": types.AboutSectionFragmentDoc,
    "\n  mutation ContactMe($input: ContactMeInput!) {\n    contactMe(input: $input) {\n      success\n    }\n  }\n": types.ContactMeDocument,
    "\n  fragment ExperienceItem on Experience {\n    duration\n    title\n    location\n    description\n    imageUrl\n  }\n": types.ExperienceItemFragmentDoc,
    "\n  fragment FooterSocial on Social {\n    linkedIn\n    github\n    email\n  }\n": types.FooterSocialFragmentDoc,
    "\n  fragment PortfolioCard on Work {\n    title\n    subTitle\n    location\n    link\n    date\n    imageUrl\n  }\n": types.PortfolioCardFragmentDoc,
    "\n  fragment PortfolioModal on Work {\n    title\n    subTitle\n    description\n    location\n    link\n    video\n    date\n    imageUrl\n    technologies\n  }\n": types.PortfolioModalFragmentDoc,
    "\n  fragment SkillsSection on Skills {\n    languages\n    technologies\n    tools\n    loves\n  }\n": types.SkillsSectionFragmentDoc,
    "\n  fragment SiteNavSocial on Social {\n    linkedIn\n    github\n  }\n": types.SiteNavSocialFragmentDoc,
    "\n  query AppQuery {\n    chris {\n      id\n      title\n      description\n      about {\n        ...AboutSection\n      }\n      experience {\n        ...ExperienceItem\n      }\n      skills {\n        ...SkillsSection\n      }\n      work {\n        ...PortfolioCard\n        ...PortfolioModal\n      }\n      social {\n        ...SiteNavSocial\n        ...FooterSocial\n      }\n    }\n  }\n": types.AppQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AboutSection on About {\n    description\n    imageUrl\n    imageCaption\n    imageTitle\n    tagLine\n  }\n"): typeof import('./graphql').AboutSectionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ContactMe($input: ContactMeInput!) {\n    contactMe(input: $input) {\n      success\n    }\n  }\n"): typeof import('./graphql').ContactMeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ExperienceItem on Experience {\n    duration\n    title\n    location\n    description\n    imageUrl\n  }\n"): typeof import('./graphql').ExperienceItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FooterSocial on Social {\n    linkedIn\n    github\n    email\n  }\n"): typeof import('./graphql').FooterSocialFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PortfolioCard on Work {\n    title\n    subTitle\n    location\n    link\n    date\n    imageUrl\n  }\n"): typeof import('./graphql').PortfolioCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PortfolioModal on Work {\n    title\n    subTitle\n    description\n    location\n    link\n    video\n    date\n    imageUrl\n    technologies\n  }\n"): typeof import('./graphql').PortfolioModalFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SkillsSection on Skills {\n    languages\n    technologies\n    tools\n    loves\n  }\n"): typeof import('./graphql').SkillsSectionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SiteNavSocial on Social {\n    linkedIn\n    github\n  }\n"): typeof import('./graphql').SiteNavSocialFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AppQuery {\n    chris {\n      id\n      title\n      description\n      about {\n        ...AboutSection\n      }\n      experience {\n        ...ExperienceItem\n      }\n      skills {\n        ...SkillsSection\n      }\n      work {\n        ...PortfolioCard\n        ...PortfolioModal\n      }\n      social {\n        ...SiteNavSocial\n        ...FooterSocial\n      }\n    }\n  }\n"): typeof import('./graphql').AppQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
