import { Resolver, Mutation, Args, Query, ID, ResolveField, Parent } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { CreateGameDto, PlayRoundDto } from '@repo/api/game/dto/create-game.dto';
import { Game, Round } from '@repo/api/game/entities/game.entity';
import { PrismaService } from '../prisma.service';
import { GameResourceType } from '@repo/types';

@Resolver(() => Game)
export class GamesResolver {
    constructor(private readonly gamesService: GamesService) { }

    @Mutation(() => Game)
    createGame(@Args('data') data: CreateGameDto) {
        return this.gamesService.createGame(data);
    }

    @Mutation(() => Round)
    playRound(@Args('data') data: PlayRoundDto) {
        return this.gamesService.playRound(data);
    }

    @Query(() => Game, { nullable: true })
    game(@Args('id', { type: () => ID }) id: string) {
        return this.gamesService.getGame(id);
    }

    @Query(() => [Game])
    games() {
        return this.gamesService.listGames();
    }
}

// Resolver pól relacyjnych dla Round
@Resolver(() => Round)
export class RoundRelationsResolver {
    constructor(private readonly prisma: PrismaService) {}

    @ResolveField()
    async left(@Parent() round: Round) {
        // Pobierz grę, aby znać resourceType
        const game = await this.prisma.game.findUnique({ where: { id: round.gameId } });
        if (!game) return null;
        if (game.resourceType === GameResourceType.PERSON) {
            return this.prisma.person.findUnique({ where: { id: round.leftId } });
        } else if (game.resourceType === GameResourceType.STARSHIP) {
            return this.prisma.starship.findUnique({ where: { id: round.leftId } });
        }
        return null;
    }

    @ResolveField()
    async right(@Parent() round: Round) {
        const game = await this.prisma.game.findUnique({ where: { id: round.gameId } });
        if (!game) return null;
        if (game.resourceType === GameResourceType.PERSON) {
            return this.prisma.person.findUnique({ where: { id: round.rightId } });
        } else if (game.resourceType === GameResourceType.STARSHIP) {
            return this.prisma.starship.findUnique({ where: { id: round.rightId } });
        }
        return null;
    }

    @ResolveField()
    async winner(@Parent() round: Round) {
        if (!round.winnerId) return null;
        const game = await this.prisma.game.findUnique({ where: { id: round.gameId } });
        if (!game) return null;
        if (game.resourceType === GameResourceType.PERSON) {
            return this.prisma.person.findUnique({ where: { id: round.winnerId } });
        } else if (game.resourceType === GameResourceType.STARSHIP) {
            return this.prisma.starship.findUnique({ where: { id: round.winnerId } });
        }
        return null;
    }
} 