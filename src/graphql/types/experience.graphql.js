import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Experience',
  fields: {
    duration: { type: GraphQLString },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
});
