import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';

export default new GraphQLObjectType({
  name: 'Work',
  fields: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
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
