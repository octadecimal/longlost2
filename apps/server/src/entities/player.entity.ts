import * as mongoose from 'mongoose';
import { IPlayer } from '@longlost/api';
import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Player implements IPlayer {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  isRegistered: boolean;
}

export const PlayerModel = getModelForClass(Player);
