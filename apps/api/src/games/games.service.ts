import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGameDto, ResourceType } from '@repo/api/game/dto/create-game.dto';

@Injectable()
export class GamesService {
    constructor(private readonly prisma: PrismaService) { }

    async createGame(dto: CreateGameDto) {
        let left, right, leftValue, rightValue;
        if (dto.resourceType === 'person') {
            left = await this.prisma.person.findUnique({ where: { id: dto.leftId } });
            right = await this.prisma.person.findUnique({ where: { id: dto.rightId } });
            if (!left || !right) throw new NotFoundException('Person not found');
            leftValue = left.mass;
            rightValue = right.mass;
        } else if (dto.resourceType === 'starship') {
            left = await this.prisma.starship.findUnique({ where: { id: dto.leftId } });
            right = await this.prisma.starship.findUnique({ where: { id: dto.rightId } });
            if (!left || !right) throw new NotFoundException('Starship not found');
            leftValue = left.crew;
            rightValue = right.crew;
        } else {
            throw new BadRequestException('Invalid resource type');
        }

        let winnerId: string | null = null;
        if (leftValue > rightValue) winnerId = dto.leftId;
        else if (rightValue > leftValue) winnerId = dto.rightId;

        const game = await this.prisma.game.create({
            data: {
                resourceType: dto.resourceType,
                leftId: dto.leftId,
                rightId: dto.rightId,
                leftValue,
                rightValue,
                winnerId,
            },
        });

        return {
            ...game,
            leftValue,
            rightValue,
            winnerId,
        };
    }

    async getGame(id: string) {
        const game = await this.prisma.game.findUnique({ where: { id } });
        if (!game) throw new NotFoundException('Game not found');
        return game;
    }

    async listGames() {
        return this.prisma.game.findMany({ orderBy: { createdAt: 'desc' } });
    }
} 