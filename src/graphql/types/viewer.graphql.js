// @flow
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import {
  ViewerModel,
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

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLNonNull(GraphQLString),
      resolve: () =>
        'Chris Driscol | Senior Full Stack Engineer in Boulder Colorado',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      resolve: () =>
        `Hi, I'm Chris Driscol, an experienced full stack software engineer with a passion for crafting really awesome software.  Check out my site to learn about me!`,
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

TypeModelResolver.registerType(ViewerType, ViewerModel);

export default ViewerType;
