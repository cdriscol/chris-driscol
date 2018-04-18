// @flow
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import {
  ChrisModel,
  ExperienceModel,
  AboutModel,
  WorkModel,
  SocialModel,
} from '../database';
import { nodeInterface } from './node-interface';
import TypeModelResolver from './type-model-resolver';
import SkillsType from './skills.graphql';
import ExperienceType from './experience.graphql';
import AboutType from './about.graphql';
import WorkType from './work.graphql';
import SocialType from './social.graphql';

const ChrisType = new GraphQLObjectType({
  name: 'Chris',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLNonNull(GraphQLString),
      resolve: () => 'Chris Driscol | Director of Engineering in Colorado',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      resolve: () =>
        `Hi, I'm Chris Driscol, an experienced full-stack engineer with a passion for crafting really awesome software.  Check out my site to learn about me!`,
    },
    skills: {
      type: GraphQLNonNull(SkillsType),
    },
    experience: {
      type: GraphQLNonNull(new GraphQLList(ExperienceType)),
      resolve: () => ExperienceModel.getExperience(),
    },
    about: {
      type: GraphQLNonNull(AboutType),
      resolve: () => AboutModel.getAboutMe(),
    },
    work: {
      type: GraphQLNonNull(new GraphQLList(WorkType)),
      resolve: () => WorkModel.getMyWork(),
    },
    social: {
      type: GraphQLNonNull(SocialType),
      resolve: () => SocialModel.getSocialData(),
    },
  },
  interfaces: [nodeInterface],
});

TypeModelResolver.registerType(ChrisType, ChrisModel);

export default ChrisType;
