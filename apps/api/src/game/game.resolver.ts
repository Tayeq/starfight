import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GameService } from './game.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { Game } from '@repo/api/game/entities/game.entity';

@Resolver(() => Game)
export class GameResolver {
    constructor(private readonly gameService: GameService) { }

    @Mutation(() => Game)
    createGame(@Args('data') data: CreateGameDto) {
        return this.gameService.createGame(data);
    }

    @Query(() => Game, { nullable: true })
    game(@Args('id') id: string) {
        return this.gameService.getGame(id);
    }

    @Query(() => [Game])
    games() {
        return this.gameService.listGames();
    }
} 