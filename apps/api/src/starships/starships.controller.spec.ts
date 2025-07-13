import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { PrismaService } from '../prisma.service';
import { createStarshipPrismaMock, TEST_UUID, TEST_STARSHIP } from './starships.mocks';

describe('StarshipsController', () => {
    let controller: StarshipsController;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StarshipsController],
            providers: [
                { provide: PrismaService, useValue: { starship: createStarshipPrismaMock() } },
            ],
        }).compile();
        controller = module.get<StarshipsController>(StarshipsController);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a starship', async () => {
        const result = await controller.create({ name: 'TestShip', crew: 5 });
        expect(result).toEqual(TEST_STARSHIP);
    });

    it('should return all starships', async () => {
        const result = await controller.findAll();
        expect(result).toEqual([TEST_STARSHIP]);
    });

    it('should return a starship by id', async () => {
        const result = await controller.findOne(TEST_UUID);
        expect(result).toEqual(TEST_STARSHIP);
    });

    it('should update a starship', async () => {
        const result = await controller.update(TEST_UUID, { crew: 10 });
        expect(result).toEqual({ ...TEST_STARSHIP, crew: 10 });
    });

    it('should delete a starship', async () => {
        const result = await controller.remove(TEST_UUID);
        expect(result).toEqual(TEST_STARSHIP);
    });
}); 