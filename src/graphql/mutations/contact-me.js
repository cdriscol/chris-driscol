import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';

export default mutationWithClientMutationId({
  name: 'ContactMe',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    subject: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: ({ email, name, subject, body }) => ({ success: true }),
});
