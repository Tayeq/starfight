import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { PlayRoundDto } from '@repo/api/game/dto/play-round.dto';
import { GameResourceType } from '@repo/types';

@Injectable()
export class GamesService {
    constructor(private readonly prisma: PrismaService) { }

    async createGame(dto: CreateGameDto) {
        const game = await this.prisma.game.create({
            data: {
                resourceType: dto.resourceType,
            },
        });
        return game;
    }

    async playRound(dto: PlayRoundDto) {
        const game = await this.prisma.game.findUnique({ where: { id: dto.gameId } });
        if (!game) throw new NotFoundException('Game not found');

        let left, right, leftValue, rightValue;
        if (game.resourceType === GameResourceType.PERSON) {
            const people = await this.prisma.person.findMany();
            if (people.length < 2) throw new BadRequestException('Not enough people');
            let idx1 = Math.floor(Math.random() * people.length);
            let idx2;
            do { idx2 = Math.floor(Math.random() * people.length); } while (idx2 === idx1);
            left = people[idx1];
            right = people[idx2];
            leftValue = left.mass;
            rightValue = right.mass;
        } else if (game.resourceType === GameResourceType.STARSHIP) {
            const starships = await this.prisma.starship.findMany();
            if (starships.length < 2) throw new BadRequestException('Not enough starships');
            let idx1 = Math.floor(Math.random() * starships.length);
            let idx2;
            do { idx2 = Math.floor(Math.random() * starships.length); } while (idx2 === idx1);
            left = starships[idx1];
            right = starships[idx2];
            leftValue = left.crew;
            rightValue = right.crew;
        } else {
            throw new BadRequestException('Invalid resource type');
        }

        let winnerId: string | null = null;
        if (leftValue > rightValue) winnerId = left.id;
        else if (rightValue > leftValue) winnerId = right.id;

        const round = await this.prisma.round.create({
            data: {
                gameId: game.id,
                leftId: left.id,
                rightId: right.id,
                leftValue,
                rightValue,
                winnerId,
            },
        });

        return {
            ...round,
            left,
            right,
            winnerId,
        };
    }

    async getGame(id: string) {
        const game = await this.prisma.game.findUnique({
            where: { id },
            include: {
                rounds: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!game) throw new NotFoundException('Game not found');
        return game;
    }

    async listGames() {
        return this.prisma.game.findMany({ orderBy: { createdAt: 'desc' }, include: { rounds: true } });
    }
} 