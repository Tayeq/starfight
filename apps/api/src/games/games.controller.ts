import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { PlayRoundDto } from '@repo/api/game/dto/play-round.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @Post()
    create(@Body() dto: CreateGameDto) {
        return this.gamesService.createGame(dto);
    }

    @Post(':id/round')
    playRound(@Body() dto: PlayRoundDto) {
        return this.gamesService.playRound(dto);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.gamesService.getGame(id);
    }

    @Get()
    list() {
        return this.gamesService.listGames();
    }
} 