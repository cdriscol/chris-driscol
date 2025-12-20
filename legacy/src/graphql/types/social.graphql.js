// @flow
import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'Social',
  fields: {
    linkedIn: {
      type: GraphQLNonNull(GraphQLString),
    },
    github: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});
