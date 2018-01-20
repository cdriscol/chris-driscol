import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ViewerModel, ExperienceModel, AboutModel, WorkModel } from '../database';
import { nodeInterface } from './node-interface';
import TypeModelResolver from './type-model-resolver';
import SkillsType from './skills.graphql';
import ExperienceType from './experience.graphql';
import AboutType from './about.graphql';
import WorkType from './work.graphql';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLString,
      resolve: () =>
        'Chris Driscol | Senior Full Stack Engineer in Boulder Colorado',
    },
    skills: {
      type: SkillsType,
    },
    experience: {
      type: new GraphQLList(ExperienceType),
      resolve: () => ExperienceModel.getExperience(),
    },
    about: {
      type: AboutType,
      resolve: () => AboutModel.getAboutMe(),
    },
    work: {
      type: new GraphQLList(WorkType),
      resolve: () => WorkModel.getMyWork(),
    },
  },
  interfaces: [nodeInterface],
});

TypeModelResolver.registerType(ViewerType, ViewerModel);

export default ViewerType;
