/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from 'type-graphql';
import { UserResolver } from './resolvers/user.resolver';

export const RESOLVERS: NonEmptyArray<Function> = [UserResolver];
