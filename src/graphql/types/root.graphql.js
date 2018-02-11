// @flow
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import invariant from 'invariant';
import ViewerType from './viewer.graphql';
import TypeModelResolver from './type-model-resolver';
import { nodeField } from './node-interface';

export default new GraphQLObjectType({
  name: 'ROOT',
  fields: {
    viewer: {
      type: GraphQLNonNull(ViewerType),
      resolve: () => {
        const model = TypeModelResolver.getModelFromGraphType(ViewerType.name);
        invariant(model, 'Expected a model to match type name');
        return model.findById('guest');
      },
    },
    node: nodeField,
  },
});
