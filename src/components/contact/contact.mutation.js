import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation contactMutation($input: ContactMeInput!) {
    contactMe(input: $input) {
      success
    }
  }
`;

let nextClientMutationId = 0;
function commit(environment, input = {}, config = {}) {
  const clientMutationId = nextClientMutationId++;
  const variables = {
    input: {
      ...input,
      clientMutationId,
    },
  };

  return commitMutation(environment, {
    ...config,
    mutation,
    variables,
  });
}

export default { commit };
