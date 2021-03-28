import { Mutation, Query, Resolver } from 'type-graphql';
import { Player, PlayerModel } from '../entities/player.entity';
import 'mongoose';

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  async getAllPlayers() {
    return await PlayerModel.find();
  }

  @Mutation(() => Player)
  async createNewPlayer() {
    const player = new PlayerModel();

    await player.save();
    return player;
  }
}
