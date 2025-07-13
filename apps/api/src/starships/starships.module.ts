import { Module } from '@nestjs/common';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsController } from './starships.controller';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [StarshipsResolver, PrismaService],
    controllers: [StarshipsController],
})
export class StarshipsModule { } 