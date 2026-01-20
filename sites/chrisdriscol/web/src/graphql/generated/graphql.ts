/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type About = {
  __typename?: 'About';
  description: Array<Scalars['String']['output']>;
  imageCaption?: Maybe<Scalars['String']['output']>;
  imageTitle?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  tagLine?: Maybe<Scalars['String']['output']>;
};

export type Chris = {
  __typename?: 'Chris';
  about: About;
  description: Scalars['String']['output'];
  experience: Array<Experience>;
  id: Scalars['String']['output'];
  skills: Skills;
  social: Social;
  title: Scalars['String']['output'];
  work: Array<Work>;
};

export type ContactMeInput = {
  body: Scalars['String']['input'];
  from: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type ContactMePayload = {
  __typename?: 'ContactMePayload';
  success: Scalars['Boolean']['output'];
};

export type Experience = {
  __typename?: 'Experience';
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  contactMe: ContactMePayload;
};


export type MutationRootContactMeArgs = {
  input: ContactMeInput;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  chris: Chris;
  ping: Scalars['String']['output'];
};

export type Skills = {
  __typename?: 'Skills';
  languages: Array<Scalars['String']['output']>;
  loves: Array<Scalars['String']['output']>;
  technologies: Array<Scalars['String']['output']>;
  tools: Array<Scalars['String']['output']>;
};

export type Social = {
  __typename?: 'Social';
  email: Scalars['String']['output'];
  github: Scalars['String']['output'];
  linkedIn: Scalars['String']['output'];
};

export type Work = {
  __typename?: 'Work';
  date?: Maybe<Scalars['String']['output']>;
  description: Array<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  technologies: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type AboutSectionFragment = { __typename?: 'About', description: Array<string>, imageUrl?: string | null, imageCaption?: string | null, imageTitle?: string | null, tagLine?: string | null } & { ' $fragmentName'?: 'AboutSectionFragment' };

export type ContactMeMutationVariables = Exact<{
  input: ContactMeInput;
}>;


export type ContactMeMutation = { __typename?: 'MutationRoot', contactMe: { __typename?: 'ContactMePayload', success: boolean } };

export type ExperienceItemFragment = { __typename?: 'Experience', duration?: string | null, title?: string | null, location?: string | null, description?: string | null, imageUrl?: string | null } & { ' $fragmentName'?: 'ExperienceItemFragment' };

export type FooterSocialFragment = { __typename?: 'Social', linkedIn: string, github: string, email: string } & { ' $fragmentName'?: 'FooterSocialFragment' };

export type PortfolioCardFragment = { __typename?: 'Work', title?: string | null, subTitle?: string | null, location?: string | null, link?: string | null, date?: string | null, imageUrl?: string | null } & { ' $fragmentName'?: 'PortfolioCardFragment' };

export type PortfolioModalFragment = { __typename?: 'Work', title?: string | null, subTitle?: string | null, description: Array<string>, location?: string | null, link?: string | null, video?: string | null, date?: string | null, imageUrl?: string | null, technologies: Array<string> } & { ' $fragmentName'?: 'PortfolioModalFragment' };

export type SkillsSectionFragment = { __typename?: 'Skills', languages: Array<string>, technologies: Array<string>, tools: Array<string>, loves: Array<string> } & { ' $fragmentName'?: 'SkillsSectionFragment' };

export type SiteNavSocialFragment = { __typename?: 'Social', linkedIn: string, github: string } & { ' $fragmentName'?: 'SiteNavSocialFragment' };

export type AppQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQueryQuery = { __typename?: 'QueryRoot', chris: { __typename?: 'Chris', id: string, title: string, description: string, about: (
      { __typename?: 'About' }
      & { ' $fragmentRefs'?: { 'AboutSectionFragment': AboutSectionFragment } }
    ), experience: Array<(
      { __typename?: 'Experience' }
      & { ' $fragmentRefs'?: { 'ExperienceItemFragment': ExperienceItemFragment } }
    )>, skills: (
      { __typename?: 'Skills' }
      & { ' $fragmentRefs'?: { 'SkillsSectionFragment': SkillsSectionFragment } }
    ), work: Array<(
      { __typename?: 'Work' }
      & { ' $fragmentRefs'?: { 'PortfolioCardFragment': PortfolioCardFragment;'PortfolioModalFragment': PortfolioModalFragment } }
    )>, social: (
      { __typename?: 'Social' }
      & { ' $fragmentRefs'?: { 'SiteNavSocialFragment': SiteNavSocialFragment;'FooterSocialFragment': FooterSocialFragment } }
    ) } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const AboutSectionFragmentDoc = new TypedDocumentString(`
    fragment AboutSection on About {
  description
  imageUrl
  imageCaption
  imageTitle
  tagLine
}
    `, {"fragmentName":"AboutSection"}) as unknown as TypedDocumentString<AboutSectionFragment, unknown>;
export const ExperienceItemFragmentDoc = new TypedDocumentString(`
    fragment ExperienceItem on Experience {
  duration
  title
  location
  description
  imageUrl
}
    `, {"fragmentName":"ExperienceItem"}) as unknown as TypedDocumentString<ExperienceItemFragment, unknown>;
export const FooterSocialFragmentDoc = new TypedDocumentString(`
    fragment FooterSocial on Social {
  linkedIn
  github
  email
}
    `, {"fragmentName":"FooterSocial"}) as unknown as TypedDocumentString<FooterSocialFragment, unknown>;
export const PortfolioCardFragmentDoc = new TypedDocumentString(`
    fragment PortfolioCard on Work {
  title
  subTitle
  location
  link
  date
  imageUrl
}
    `, {"fragmentName":"PortfolioCard"}) as unknown as TypedDocumentString<PortfolioCardFragment, unknown>;
export const PortfolioModalFragmentDoc = new TypedDocumentString(`
    fragment PortfolioModal on Work {
  title
  subTitle
  description
  location
  link
  video
  date
  imageUrl
  technologies
}
    `, {"fragmentName":"PortfolioModal"}) as unknown as TypedDocumentString<PortfolioModalFragment, unknown>;
export const SkillsSectionFragmentDoc = new TypedDocumentString(`
    fragment SkillsSection on Skills {
  languages
  technologies
  tools
  loves
}
    `, {"fragmentName":"SkillsSection"}) as unknown as TypedDocumentString<SkillsSectionFragment, unknown>;
export const SiteNavSocialFragmentDoc = new TypedDocumentString(`
    fragment SiteNavSocial on Social {
  linkedIn
  github
}
    `, {"fragmentName":"SiteNavSocial"}) as unknown as TypedDocumentString<SiteNavSocialFragment, unknown>;
export const ContactMeDocument = new TypedDocumentString(`
    mutation ContactMe($input: ContactMeInput!) {
  contactMe(input: $input) {
    success
  }
}
    `) as unknown as TypedDocumentString<ContactMeMutation, ContactMeMutationVariables>;
export const AppQueryDocument = new TypedDocumentString(`
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
    fragment AboutSection on About {
  description
  imageUrl
  imageCaption
  imageTitle
  tagLine
}
fragment ExperienceItem on Experience {
  duration
  title
  location
  description
  imageUrl
}
fragment FooterSocial on Social {
  linkedIn
  github
  email
}
fragment PortfolioCard on Work {
  title
  subTitle
  location
  link
  date
  imageUrl
}
fragment PortfolioModal on Work {
  title
  subTitle
  description
  location
  link
  video
  date
  imageUrl
  technologies
}
fragment SkillsSection on Skills {
  languages
  technologies
  tools
  loves
}
fragment SiteNavSocial on Social {
  linkedIn
  github
}`) as unknown as TypedDocumentString<AppQueryQuery, AppQueryQueryVariables>;