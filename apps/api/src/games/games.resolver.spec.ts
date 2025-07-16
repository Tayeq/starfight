import { Test, TestingModule } from '@nestjs/testing';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { GameResourceType } from '@repo/types';
import { RoundRelationsResolver } from './games.resolver';
import { PrismaService } from '../prisma.service';
import { createGamesPrismaMock, createPersonPrismaMock, createStarshipPrismaMock, createRoundPrismaMock, TEST_ROUND, TEST_GAME, TEST_GAME_ID } from './games.mock';

describe('RoundRelationsResolver', () => {
    let resolver: RoundRelationsResolver;
    let prisma: PrismaService;

    function setupModule({
        gameMock = createGamesPrismaMock(),
        personMock = createPersonPrismaMock(),
        starshipMock = createStarshipPrismaMock(),
    } = {}) {
        return Test.createTestingModule({
            providers: [
                RoundRelationsResolver,
                {
                    provide: PrismaService,
                    useValue: {
                        game: gameMock,
                        person: personMock,
                        starship: starshipMock,
                    },
                },
            ],
        }).compile();
    }

    it('should be defined', async () => {
        const module = await setupModule();
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        expect(resolver).toBeDefined();
    });

    it('should resolve left as person', async () => {
        const round = { ...TEST_ROUND, leftId: 'p1', rightId: 'p2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'PERSON',
                leftId: round.leftId,
                rightId: round.rightId,
            }),
        });
        const personMock = createPersonPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 'p1', name: 'Luke', mass: 80 }),
        });
        const module = await setupModule({ gameMock, personMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.left(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('p1');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.person.findUnique).toHaveBeenCalledWith({ where: { id: round.leftId } });
    });

    it('should resolve right as starship', async () => {
        const round = { ...TEST_ROUND, leftId: 's2', rightId: 's1', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'STARSHIP',
                leftId: round.leftId,
                rightId: round.rightId,
            }),
        });
        const starshipMock = createStarshipPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 's1', name: 'X-Wing', crew: 1 }),
        });
        const module = await setupModule({ gameMock, starshipMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.right(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('s1');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.starship.findUnique).toHaveBeenCalledWith({ where: { id: round.rightId } });
    });

    it('should resolve winner as null if no winnerId', async () => {
        const round = { ...TEST_ROUND, winnerId: null, gameId: TEST_GAME_ID };
        const module = await setupModule();
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        const result = await resolver.winner(round);
        expect(result).toBeNull();
    });

    it('should resolve winner as person', async () => {
        const round = { ...TEST_ROUND, winnerId: 'p1', leftId: 'p1', rightId: 'p2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'PERSON',
                leftId: round.leftId,
                rightId: round.rightId,
                winnerId: round.winnerId,
            }),
        });
        const personMock = createPersonPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 'p1', name: 'Luke', mass: 80 }),
        });
        const module = await setupModule({ gameMock, personMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.winner(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('p1');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.person.findUnique).toHaveBeenCalledWith({ where: { id: round.winnerId } });
    });

    it('should return null if game not found', async () => {
        const round = { ...TEST_ROUND, leftId: 'p1', rightId: 'p2', gameId: 'not-exist' };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue(null),
        });
        const module = await setupModule({ gameMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.left(round);
        expect(result).toBeNull();
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
    });

    it('should return null for unsupported resourceType', async () => {
        const round = { ...TEST_ROUND, leftId: 'x1', rightId: 'x2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'UNKNOWN',
                leftId: round.leftId,
                rightId: round.rightId,
            }),
        });
        const module = await setupModule({ gameMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        const result = await resolver.left(round);
        expect(result).toBeNull();
    });

    it('should return null if winnerId does not match leftId or rightId', async () => {
        const round = { ...TEST_ROUND, winnerId: 'not-exist', leftId: 'p1', rightId: 'p2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'PERSON',
                leftId: round.leftId,
                rightId: round.rightId,
                winnerId: round.winnerId,
            }),
        });
        const personMock = createPersonPrismaMock({
            findUnique: jest.fn().mockResolvedValue(null),
        });
        const module = await setupModule({ gameMock, personMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.winner(round);
        expect(result).toBeNull();
        expect(prisma.person.findUnique).toHaveBeenCalledWith({ where: { id: round.winnerId } });
    });

    it('should resolve left as starship', async () => {
        const round = { ...TEST_ROUND, leftId: 's1', rightId: 's2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'STARSHIP',
                leftId: round.leftId,
                rightId: round.rightId,
            }),
        });
        const starshipMock = createStarshipPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 's1', name: 'X-Wing', crew: 1 }),
        });
        const module = await setupModule({ gameMock, starshipMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.left(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('s1');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.starship.findUnique).toHaveBeenCalledWith({ where: { id: round.leftId } });
    });

    it('should resolve right as person', async () => {
        const round = { ...TEST_ROUND, leftId: 'p1', rightId: 'p2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'PERSON',
                leftId: round.leftId,
                rightId: round.rightId,
            }),
        });
        const personMock = createPersonPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 'p2', name: 'Vader', mass: 120 }),
        });
        const module = await setupModule({ gameMock, personMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.right(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('p2');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.person.findUnique).toHaveBeenCalledWith({ where: { id: round.rightId } });
    });

    it('should resolve winner as starship', async () => {
        const round = { ...TEST_ROUND, winnerId: 's1', leftId: 's1', rightId: 's2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'STARSHIP',
                leftId: round.leftId,
                rightId: round.rightId,
                winnerId: round.winnerId,
            }),
        });
        const starshipMock = createStarshipPrismaMock({
            findUnique: jest.fn().mockResolvedValue({ id: 's1', name: 'X-Wing', crew: 1 }),
        });
        const module = await setupModule({ gameMock, starshipMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        prisma = module.get<PrismaService>(PrismaService);
        const result = await resolver.winner(round);
        expect(result).toBeDefined();
        expect(result.id).toBe('s1');
        expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: round.gameId } });
        expect(prisma.starship.findUnique).toHaveBeenCalledWith({ where: { id: round.winnerId } });
    });

    it('should return null for winner with unsupported resourceType', async () => {
        const round = { ...TEST_ROUND, winnerId: 'x1', leftId: 'x1', rightId: 'x2', gameId: TEST_GAME_ID };
        const gameMock = createGamesPrismaMock({
            findUnique: jest.fn().mockResolvedValue({
                ...TEST_GAME,
                resourceType: 'UNKNOWN',
                leftId: round.leftId,
                rightId: round.rightId,
                winnerId: round.winnerId,
            }),
        });
        const module = await setupModule({ gameMock });
        resolver = module.get<RoundRelationsResolver>(RoundRelationsResolver);
        const result = await resolver.winner(round);
        expect(result).toBeNull();
    });
});

describe('GamesResolver', () => {
    let resolver: GamesResolver;
    let service: GamesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GamesResolver,
                {
                    provide: GamesService,
                    useValue: {
                        createGame: jest.fn().mockResolvedValue(TEST_GAME),
                        getGame: jest.fn().mockResolvedValue(TEST_GAME),
                        listGames: jest.fn().mockResolvedValue([TEST_GAME]),
                        playRound: jest.fn().mockResolvedValue(TEST_ROUND),
                    },
                },
            ],
        }).compile();
        resolver = module.get<GamesResolver>(GamesResolver);
        service = module.get<GamesService>(GamesService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should create a game', async () => {
        const dto: CreateGameDto = { resourceType: GameResourceType.PERSON };
        const result = await resolver.createGame(dto);
        expect(result).toEqual(TEST_GAME);
        expect(service.createGame).toHaveBeenCalledWith(dto);
    });

    it('should get a game', async () => {
        const result = await resolver.game(TEST_GAME_ID);
        expect(result).toEqual(TEST_GAME);
        expect(service.getGame).toHaveBeenCalledWith(TEST_GAME_ID);
    });

    it('should list games', async () => {
        const result = await resolver.games();
        expect(result).toEqual([TEST_GAME]);
        expect(service.listGames).toHaveBeenCalled();
    });

    it('should play a round', async () => {
        const dto = { gameId: TEST_GAME_ID };
        const result = await resolver.playRound(dto);
        expect(result).toEqual(TEST_ROUND);
        expect(service.playRound).toHaveBeenCalledWith(dto);
    });
}); 