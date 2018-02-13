// @flow
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import invariant from 'invariant';
import ChrisType from './chris.graphql';
import TypeModelResolver from './type-model-resolver';
import { nodeField } from './node-interface';

export default new GraphQLObjectType({
  name: 'ROOT',
  description:
    'This is the root query of my GraphQL schema. This is the API that serves data for my website.',
  fields: {
    chris: {
      type: GraphQLNonNull(ChrisType),
      description: 'This field contains information about me, Chris Driscol!',
      resolve: () => {
        const model = TypeModelResolver.getModelFromGraphType(ChrisType.name);
        invariant(model, 'Expected a model to match type name');
        return model.findById('guest');
      },
    },
    node: nodeField,
  },
});
