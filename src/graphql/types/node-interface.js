// @flow
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import TypeModelResolver from './type-model-resolver';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    const dbModel = TypeModelResolver.getModelFromGraphType(type);
    return dbModel ? dbModel.findById(id) : null;
  },
  obj => TypeModelResolver.getGraphTypeFromModel(obj),
);

export { nodeInterface, nodeField };
