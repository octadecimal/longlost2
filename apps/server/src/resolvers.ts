/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from 'type-graphql';
import { PlayerResolver } from './resolvers/player.resolver';
import { UserResolver } from './resolvers/user.resolver';

export const RESOLVERS: NonEmptyArray<Function> = [UserResolver, PlayerResolver];
