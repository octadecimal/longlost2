import { AuthChecker, ResolverData } from 'type-graphql';

export const setupAuth: AuthChecker = async (resolverData: ResolverData<{ user: string }>, roles: any[]) => {
  // if (!resolverData.context.user) {
  // return false;
  // }

  return true;
};
