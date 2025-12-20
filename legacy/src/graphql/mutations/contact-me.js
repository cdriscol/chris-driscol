// @flow
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { sendEmail } from '../../util';

export default mutationWithClientMutationId({
  name: 'ContactMe',
  inputFields: {
    from: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    subject: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: ({ from, body, subject, name }) =>
    sendEmail({ from, body, subject, name })
      .then(() => ({ success: true }))
      .catch(err => {
        console.error(err);
        throw err;
      }),
});
