import { GraphQLString, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ViewerModel } from '../database';
import { nodeInterface } from './node-interface';
import TypeModelResolver from './type-model-resolver';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    status: {
      type: GraphQLString,
      resolve: () => 'OK',
    },
  },
  interfaces: [nodeInterface],
});

TypeModelResolver.registerType(ViewerType, ViewerModel);

export default ViewerType;
