import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { CreateGameDto } from '@repo/api/game/dto/create-game.dto';
import { PlayRoundDto } from '@repo/api/game/dto/play-round.dto';
import { TEST_GAME, TEST_GAME_ID, TEST_ROUND } from './games.mock';
import { GameResourceType } from '@repo/types';

describe('GamesController', () => {
    let controller: GamesController;
    let service: GamesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GamesController],
            providers: [
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
        controller = module.get<GamesController>(GamesController);
        service = module.get<GamesService>(GamesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a game', async () => {
        const dto: CreateGameDto = { resourceType: GameResourceType.PERSON };
        const result = await controller.create(dto);
        expect(result).toEqual(TEST_GAME);
        expect(service.createGame).toHaveBeenCalledWith(dto);
    });

    it('should get a game', async () => {
        const result = await controller.get(TEST_GAME_ID);
        expect(result).toEqual(TEST_GAME);
        expect(service.getGame).toHaveBeenCalledWith(TEST_GAME_ID);
    });

    it('should list games', async () => {
        const result = await controller.list();
        expect(result).toEqual([TEST_GAME]);
        expect(service.listGames).toHaveBeenCalled();
    });

    it('should play a round', async () => {
        const dto: PlayRoundDto = { gameId: TEST_GAME_ID };
        const result = await controller.playRound(dto);
        expect(result).toEqual(TEST_ROUND);
        expect(service.playRound).toHaveBeenCalledWith(dto);
    });
}); 