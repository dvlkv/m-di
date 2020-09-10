import { gql } from 'apollo-server';
import { createAppModule } from '@modules/index';

const typeDefs = gql`
    scalar Date

    type Query {
        ping: String!
    }
    
    type Mutation {
        ping: String!
    }
    
    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        itemsCount: Int!
        pagesCount: Int!
        currentPage: Int!
        openEnded: Boolean!
    }
`;

export default createAppModule(typeDefs, {
  Query: {
    ping: () => 'pong',
  },
  Mutation: {
    ping: () => {
      throw new Error('Pong');
    },
  },
});