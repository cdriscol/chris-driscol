// @flow
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import invariant from 'invariant';
import ChrisType from './chris.graphql';
import TypeModelResolver from './type-model-resolver';
import { nodeField } from './node-interface';

export default new GraphQLObjectType({
  name: 'ROOT',
  fields: {
    chris: {
      type: GraphQLNonNull(ChrisType),
      resolve: () => {
        const model = TypeModelResolver.getModelFromGraphType(ChrisType.name);
        invariant(model, 'Expected a model to match type name');
        return model.findById('guest');
      },
    },
    node: nodeField,
  },
});
