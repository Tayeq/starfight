import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Post()
    create(@Body() dto: CreateGameDto) {
        return this.gameService.createGame(dto);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.gameService.getGame(id);
    }

    @Get()
    list() {
        return this.gameService.listGames();
    }
} 