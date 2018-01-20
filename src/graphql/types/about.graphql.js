import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'About',
  fields: {
    description: {
      type: GraphQLString,
    },
    imageUrl: {
      type: GraphQLString,
    },
    imageCaption: {
      type: GraphQLString,
    },
    imageTitle: {
      type: GraphQLString,
    },
    tagLine: {
      type: GraphQLString,
    },
  },
});
