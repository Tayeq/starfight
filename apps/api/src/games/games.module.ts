import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesResolver, RoundRelationsResolver } from './games.resolver';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [GamesService, GamesResolver, RoundRelationsResolver, PrismaService],
    controllers: [GamesController],
})
export class GamesModule { } 