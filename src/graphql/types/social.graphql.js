import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Social',
  fields: {
    linkedIn: {
      type: GraphQLString,
    },
    github: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});
