// @flow
import { commitMutation, graphql, Environment } from 'react-relay';
import type { MutationConfigType } from './relay-flow-types';
import type { contactMutationVariables } from './__generated__/contactMutation.graphql';

const mutation = graphql`
  mutation contactMutation($input: ContactMeInput!) {
    contactMe(input: $input) {
      success
    }
  }
`;

function commit(
  environment: Environment,
  variables: contactMutationVariables,
  config: MutationConfigType = {},
) {
  /* $FlowFixMe */
  return commitMutation(environment, {
    ...config,
    mutation,
    variables,
  });
}

export default { commit };
