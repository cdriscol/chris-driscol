import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { ViewerType, TypeModelResolver, nodeField } from './types';

const GraphQLRoot = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: ViewerType,
      resolve: () =>
        // prettier-ignore
        TypeModelResolver.getModelFromGraphType(ViewerType.name).findById('guest'),
    },
    node: nodeField,
  },
});

// const GraphQLMutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {},
// });

export default new GraphQLSchema({
  query: GraphQLRoot,
  // mutation: GraphQLMutation,
});
