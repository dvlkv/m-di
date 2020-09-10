import { DocumentNode } from 'graphql';
import { IDirectiveResolvers } from 'graphql-tools';

export interface Module<Resolver, ServerContext, AppContext> {
  typeDefs: DocumentNode;
  resolvers: Resolver;
  directiveResolvers?: IDirectiveResolvers<any, AppContext>;
  context?: (ctx: ServerContext) => Partial<AppContext> | Promise<Partial<AppContext>>;
}

export function buildModuleFactory<Resolver, ServerContext, AppContext>() {
  return (
    typeDefs: DocumentNode,
    resolvers: Resolver,
    extras?: {
      directiveResolvers?: IDirectiveResolvers<any, AppContext>,
      context?: (ctx: ServerContext) => Partial<AppContext> | Promise<Partial<AppContext>>,
    },
  ) => {
    return {
      typeDefs,
      resolvers,
      ...extras,
    };
  };
}