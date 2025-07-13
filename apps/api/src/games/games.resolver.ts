import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { Game } from '@repo/api/game/entities/game.entity';

@Resolver(() => Game)
export class GamesResolver {
    constructor(private readonly gamesService: GamesService) { }

    @Mutation(() => Game)
    createGame(@Args('data') data: CreateGameDto) {
        return this.gamesService.createGame(data);
    }

    @Query(() => Game, { nullable: true })
    game(@Args('id') id: string) {
        return this.gamesService.getGame(id);
    }

    @Query(() => [Game])
    games() {
        return this.gamesService.listGames();
    }
} 