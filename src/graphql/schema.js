import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { fromGlobalId, globalIdField, nodeDefinitions } from 'graphql-relay';
import { Viewer, getViewer } from './database';

/* eslint-disable no-use-before-define */
const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Viewer') {
      return getViewer(id);
    }
    return null;
  },
  obj => {
    if (obj instanceof Viewer) {
      return GraphQLViewer;
    }
    return null;
  },
);

const GraphQLViewer = new GraphQLObjectType({
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

const GraphQLRoot = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLViewer,
      resolve: getViewer,
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
