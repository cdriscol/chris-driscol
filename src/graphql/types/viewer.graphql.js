import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ViewerModel, ExperienceModel, AboutModel } from '../database';
import { nodeInterface } from './node-interface';
import TypeModelResolver from './type-model-resolver';
import SkillsType from './skills.graphql';
import ExperienceType from './experience.graphql';
import AboutType from './about.graphql';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    status: {
      type: GraphQLString,
      resolve: () => 'OK',
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
  },
  interfaces: [nodeInterface],
});

TypeModelResolver.registerType(ViewerType, ViewerModel);

export default ViewerType;
