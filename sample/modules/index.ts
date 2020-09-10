import { findFilesRecursively } from '@lib/../../packages/utils/file';
import { buildModuleFactory, Module } from '@lib/../../packages/m-core/Module';
import { GQLResolver } from '../types';

export const createAppModule = buildModuleFactory<GQLResolver, {}>();

export const autoloadModules = () => {
  let files = findFilesRecursively(__dirname, (a) => a.endsWith('.module.ts'));
  return files.map(a => require(a).default as Module<GQLResolver, {}>);
};
