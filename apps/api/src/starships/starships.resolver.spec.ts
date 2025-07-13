import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsResolver } from './starships.resolver';
import { PrismaService } from '../prisma.service';
import { createStarshipPrismaMock, TEST_UUID, TEST_STARSHIP } from './starships.mocks';

describe('StarshipsResolver', () => {
    let resolver: StarshipsResolver;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StarshipsResolver,
                { provide: PrismaService, useValue: { starship: createStarshipPrismaMock() } },
            ],
        }).compile();
        resolver = module.get<StarshipsResolver>(StarshipsResolver);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should return all starships', async () => {
        const result = await resolver.starships();
        expect(result).toEqual([TEST_STARSHIP]);
    });

    it.each([
        [TEST_UUID, TEST_STARSHIP],
        ['not-found-uuid', null],
    ])('should return starship by id %s', async (id, expected) => {
        if (id !== TEST_UUID) jest.spyOn(prisma.starship, 'findUnique').mockResolvedValueOnce(null);
        const result = await resolver.starship(id);
        expect(result).toEqual(expected);
    });

    it('should create a starship', async () => {
        const result = await resolver.createStarship({ name: 'TestShip', crew: 5 });
        expect(result).toEqual(TEST_STARSHIP);
    });

    it('should update a starship with only one field', async () => {
        const result = await resolver.updateStarship(TEST_UUID, { crew: 10 });
        expect(result).toEqual({ id: TEST_UUID, name: 'TestShip', crew: 10 });
    });

    it('should throw if updateStarship called with no fields', async () => {
        await expect(resolver.updateStarship(TEST_UUID, {})).rejects.toThrow('No fields to update');
    });

    it('should return null if deleteStarship called with non-existing id', async () => {
        const result = await resolver.deleteStarship('not-found-uuid');
        expect(result).toBeNull();
    });

    it('should throw if prisma throws on update', async () => {
        jest.spyOn(prisma.starship, 'update').mockRejectedValueOnce(new Error('Prisma error'));
        await expect(resolver.updateStarship(TEST_UUID, { crew: 10 })).rejects.toThrow('Prisma error');
    });

    it('should throw if createStarship called with empty data', async () => {
        // @ts-expect-error: testing empty input
        await expect(resolver.createStarship({})).rejects.toThrow();
    });
}); 