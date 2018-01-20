import { GraphQLObjectType } from 'graphql';
import contactMe from './contact-me';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    contactMe,
  },
});
