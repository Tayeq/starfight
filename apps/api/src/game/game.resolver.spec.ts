import { Test, TestingModule } from '@nestjs/testing';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { TEST_GAME, TEST_GAME_ID } from './game.mock';

describe('GameResolver', () => {
    let resolver: GameResolver;
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameResolver,
                {
                    provide: GameService,
                    useValue: {
                        createGame: jest.fn().mockResolvedValue(TEST_GAME),
                        getGame: jest.fn().mockResolvedValue(TEST_GAME),
                        listGames: jest.fn().mockResolvedValue([TEST_GAME]),
                    },
                },
            ],
        }).compile();
        resolver = module.get<GameResolver>(GameResolver);
        service = module.get<GameService>(GameService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should create a game', async () => {
        const dto: CreateGameDto = { resourceType: 'person', leftId: 'p1', rightId: 'p2' };
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
}); 