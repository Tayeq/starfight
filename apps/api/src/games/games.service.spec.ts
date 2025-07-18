import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { PlayRoundDto } from '@repo/api/game/dto/play-round.dto';
import { GameResourceType } from '@repo/types';
import { createGamesPrismaMock, TEST_GAME, TEST_GAME_ID, createPersonPrismaMock, createStarshipPrismaMock, createRoundPrismaMock, TEST_ROUND, TEST_ROUND_ID } from './games.mock';

describe('GamesService', () => {
    let service: GamesService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GamesService, {
                provide: PrismaService, useValue: {
                    person: createPersonPrismaMock(),
                    starship: createStarshipPrismaMock(),
                    game: createGamesPrismaMock(),
                    round: createRoundPrismaMock(),
                }
            }],
        }).compile();
        service = module.get<GamesService>(GamesService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should create a game (person)', async () => {
        const dto: CreateGameDto = { resourceType: GameResourceType.PERSON };
        const result = await service.createGame(dto);
        expect(result).toMatchObject({
            id: TEST_GAME_ID,
            resourceType: GameResourceType.PERSON,
        });
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(prisma.game.create).toHaveBeenCalled();
    });

    it('should create a game (starship)', async () => {
        const dto: CreateGameDto = { resourceType: GameResourceType.STARSHIP };
        const result = await service.createGame(dto);
        expect(result).toMatchObject({
            id: TEST_GAME_ID,
            resourceType: GameResourceType.STARSHIP,
        });
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(prisma.game.create).toHaveBeenCalled();
    });

    it('should play a round (person)', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ id: TEST_GAME_ID, resourceType: GameResourceType.PERSON });
        const result = await service.playRound({ gameId: TEST_GAME_ID });
        expect(result).toHaveProperty('id');
        expect(result.left).toBeDefined();
        expect(result.right).toBeDefined();
        expect(result.leftValue).toBeDefined();
        expect(result.rightValue).toBeDefined();
        expect(prisma.round.create).toHaveBeenCalled();
    });

    it('should play a round (starship)', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ id: TEST_GAME_ID, resourceType: GameResourceType.STARSHIP });
        const result = await service.playRound({ gameId: TEST_GAME_ID });
        expect(result).toHaveProperty('id');
        expect(result.left).toBeDefined();
        expect(result.right).toBeDefined();
        expect(result.leftValue).toBeDefined();
        expect(result.rightValue).toBeDefined();
        expect(prisma.round.create).toHaveBeenCalled();
    });

    it('should throw if game not found in playRound', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue(null);
        await expect(service.playRound({ gameId: 'notfound' })).rejects.toThrow('Game not found');
    });

    it('should get game', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ ...TEST_GAME, rounds: [TEST_ROUND] });
        const result = await service.getGame(TEST_GAME_ID);
        expect(result).toMatchObject({
            id: TEST_GAME.id,
            resourceType: TEST_GAME.resourceType,
            rounds: [TEST_ROUND],
        });
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: TEST_GAME_ID }, include: { rounds: { orderBy: { createdAt: 'desc' } } } });
    });

    it('should throw if game not found', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValueOnce(null);
        await expect(service.getGame('notfound')).rejects.toThrow('Game not found');
    });

    it('should list games', async () => {
        prisma.game.findMany = jest.fn().mockResolvedValue([{ ...TEST_GAME, rounds: [TEST_ROUND] }]);
        const result = await service.listGames();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('rounds');
        expect(prisma.game.findMany).toHaveBeenCalled();
    });

    it('should throw if not enough people in playRound', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ id: TEST_GAME_ID, resourceType: GameResourceType.PERSON });
        prisma.person.findMany = jest.fn().mockResolvedValue([{ id: 'p1', name: 'Luke', mass: 80 }]);
        await expect(service.playRound({ gameId: TEST_GAME_ID })).rejects.toThrow('Not enough people');
    });

    it('should throw if not enough starships in playRound', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ id: TEST_GAME_ID, resourceType: GameResourceType.STARSHIP });
        prisma.starship.findMany = jest.fn().mockResolvedValue([{ id: 's1', name: 'X-Wing', crew: 1 }]);
        await expect(service.playRound({ gameId: TEST_GAME_ID })).rejects.toThrow('Not enough starships');
    });

    it('should throw if resource type is invalid in playRound', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue({ id: TEST_GAME_ID, resourceType: 'INVALID' });
        await expect(service.playRound({ gameId: TEST_GAME_ID })).rejects.toThrow('Invalid resource type');
    });

    it('should throw if game not found in getGame', async () => {
        prisma.game.findUnique = jest.fn().mockResolvedValue(null);
        await expect(service.getGame('notfound')).rejects.toThrow('Game not found');
    });

    it('should return empty array if no games in listGames', async () => {
        prisma.game.findMany = jest.fn().mockResolvedValue([]);
        const result = await service.listGames();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
    });
}); 