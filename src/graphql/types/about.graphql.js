import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';

export default new GraphQLObjectType({
  name: 'About',
  fields: {
    description: {
      type: new GraphQLList(GraphQLString),
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
