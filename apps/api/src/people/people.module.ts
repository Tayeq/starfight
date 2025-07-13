import { Module } from '@nestjs/common';
import { PeopleResolver } from './people.resolver';
import { PeopleController } from './people.controller';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [PeopleResolver, PrismaService],
    controllers: [PeopleController],
})
export class PeopleModule { } 