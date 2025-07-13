import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PrismaService } from '../prisma.service';
import { CreateGameDto, ResourceType } from '@repo/api/game/dto/create-game.dto';
import { createGamePrismaMock, TEST_GAME, TEST_GAME_ID } from './game.mock';

describe('GameService', () => {
    let service: GameService;
    let prisma: any;

    const mockPerson = { id: 'p1', name: 'Luke', mass: 80 };
    const mockPerson2 = { id: 'p2', name: 'Vader', mass: 120 };
    const mockStarship = { id: 's1', name: 'X-Wing', crew: 1 };
    const mockStarship2 = { id: 's2', name: 'Falcon', crew: 4 };

    beforeEach(async () => {
        prisma = {
            person: {
                findUnique: jest.fn((args) => {
                    if (args.where.id === 'p1') return mockPerson;
                    if (args.where.id === 'p2') return mockPerson2;
                    return null;
                }),
            },
            starship: {
                findUnique: jest.fn((args) => {
                    if (args.where.id === 's1') return mockStarship;
                    if (args.where.id === 's2') return mockStarship2;
                    return null;
                }),
            },
            game: createGamePrismaMock(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameService, { provide: PrismaService, useValue: prisma }],
        }).compile();
        service = module.get<GameService>(GameService);
    });

    it('should create a person game and pick winner', async () => {
        const dto: CreateGameDto = { resourceType: 'person', leftId: 'p1', rightId: 'p2' };
        const result = await service.createGame(dto);
        expect(result).toMatchObject({
            id: TEST_GAME.id,
            leftId: TEST_GAME.leftId,
            rightId: TEST_GAME.rightId,
            leftValue: TEST_GAME.leftValue,
            rightValue: TEST_GAME.rightValue,
            resourceType: TEST_GAME.resourceType,
            winnerId: TEST_GAME.winnerId,
        });
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(prisma.game.create).toHaveBeenCalled();
    });

    it('should create a starship game and pick winner', async () => {
        const dto: CreateGameDto = { resourceType: 'starship', leftId: 's2', rightId: 's1' };
        const result = await service.createGame(dto);
        expect(result.winnerId).toBe('s2');
        expect(result.leftValue).toBe(4);
        expect(result.rightValue).toBe(1);
        expect(prisma.game.create).toHaveBeenCalled();
    });

    it('should throw if resource not found', async () => {
        const dto: CreateGameDto = { resourceType: 'person', leftId: 'notfound', rightId: 'p2' };
        await expect(service.createGame(dto)).rejects.toThrow('Person not found');
    });

    it('should throw if resourceType is invalid', async () => {
        const dto = { resourceType: 'invalid' as ResourceType, leftId: 'p1', rightId: 'p2' };
        await expect(service.createGame(dto)).rejects.toThrow('Invalid resource type');
    });

    it('should get game', async () => {
        const result = await service.getGame(TEST_GAME_ID);
        expect(result).toMatchObject({
            id: TEST_GAME.id,
            leftId: TEST_GAME.leftId,
            rightId: TEST_GAME.rightId,
            leftValue: TEST_GAME.leftValue,
            rightValue: TEST_GAME.rightValue,
            resourceType: TEST_GAME.resourceType,
            winnerId: TEST_GAME.winnerId,
        });
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: TEST_GAME_ID } });
    });

    it('should throw if game not found', async () => {
        prisma.game.findUnique.mockResolvedValueOnce(null);
        await expect(service.getGame('notfound')).rejects.toThrow('Game not found');
    });

    it('should list games', async () => {
        const result = await service.listGames();
        expect(Array.isArray(result)).toBe(true);
        expect(prisma.game.findMany).toHaveBeenCalled();
    });
}); 