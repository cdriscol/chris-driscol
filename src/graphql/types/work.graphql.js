// @flow
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Work',
  fields: {
    title: {
      type: GraphQLString,
    },
    subTitle: {
      type: GraphQLString,
    },
    description: {
      type: new GraphQLList(GraphQLString),
    },
    location: {
      type: GraphQLString,
    },
    link: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    },
    imageUrl: {
      type: GraphQLString,
    },
    technologies: {
      type: new GraphQLList(GraphQLString),
    },
  },
});
