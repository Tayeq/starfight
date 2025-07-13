import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameResolver } from './game.resolver';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [GameService, GameResolver, PrismaService],
    controllers: [GameController],
})
export class GameModule { } 