// @flow
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'About',
  fields: {
    description: {
      type: GraphQLNonNull(new GraphQLList(GraphQLString)),
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
