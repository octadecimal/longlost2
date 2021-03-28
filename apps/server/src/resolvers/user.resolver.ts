import { Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  async ping(): Promise<boolean> {
    return true;
  }

  @Mutation(() => Boolean)
  async login(): Promise<boolean> {
    return false;
  }

  @Mutation()
  async register() {
    
  }
}
