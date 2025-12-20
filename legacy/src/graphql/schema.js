// @flow
import { GraphQLSchema } from 'graphql';
import { MutationQuery } from './mutations';
import { RootQuery } from './types';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});
