import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';
import { Module } from './Module';
import { GraphQLSchema } from 'graphql';

export const buildApp = <TResolver, TContext>(modules: Module<TResolver, any, TContext>[], configureSchema?: (schema: GraphQLSchema) => void) => {
  let schema = makeExecutableSchema<TContext>({
    typeDefs: modules.map(module => module.typeDefs),
    resolvers: merge(...modules.map(module => module.resolvers)),
    directiveResolvers: merge(...modules.filter(module => !!module.directiveResolvers).map(module => module.directiveResolvers)),
  });

  configureSchema?.call(schema);

  return {
    schema,
    context: async (ctx: any) => {
      let results = await Promise.all(modules.filter(a => !!a.context).map(a => a.context(ctx)));
      return merge(ctx, ...results);
    },
  };
};