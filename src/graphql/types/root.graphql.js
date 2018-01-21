import { GraphQLObjectType } from 'graphql';
import ViewerType from './viewer.graphql';
import TypeModelResolver from './type-model-resolver';
import { nodeField } from './node-interface';

export default new GraphQLObjectType({
  name: 'ROOT',
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
