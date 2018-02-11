// @flow
import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import { SkillsModel } from '../database';

export default new GraphQLObjectType({
  name: 'Skills',
  fields: {
    languages: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString))),
      resolve: () => SkillsModel.getLanguages(),
    },
    technologies: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString))),
      resolve: () => SkillsModel.getTechnologies(),
    },
    tools: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString))),
      resolve: () => SkillsModel.getTools(),
    },
    loves: {
      type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString))),
      resolve: () => SkillsModel.getLoves(),
    },
  },
});
