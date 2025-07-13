import { Test, TestingModule } from '@nestjs/testing';
import { PeopleResolver } from './people.resolver';
import { PrismaService } from '../prisma.service';
import { createPersonPrismaMock, TEST_UUID, TEST_PERSON } from './people.mock';

describe('PeopleResolver', () => {
    let resolver: PeopleResolver;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PeopleResolver,
                { provide: PrismaService, useValue: { person: createPersonPrismaMock() } },
            ],
        }).compile();
        resolver = module.get<PeopleResolver>(PeopleResolver);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should return all people', async () => {
        const result = await resolver.people();
        expect(result).toEqual([TEST_PERSON]);
    });

    it.each([
        [TEST_UUID, TEST_PERSON],
        ['not-found-uuid', null],
    ])('should return a person by id %s', async (id, expected) => {
        if (id !== TEST_UUID) jest.spyOn(prisma.person, 'findUnique').mockResolvedValueOnce(null);
        const result = await resolver.person(id);
        expect(result).toEqual(expected);
    });

    it('should create a person', async () => {
        const result = await resolver.createPerson({ name: 'Test', mass: 99 });
        expect(result).toEqual(TEST_PERSON);
    });

    it('should update a person with only one field', async () => {
        const result = await resolver.updatePerson(TEST_UUID, { mass: 100 });
        expect(result).toEqual({ id: TEST_UUID, name: 'Test', mass: 100 });
    });

    it('should throw if updatePerson called with no fields', async () => {
        await expect(resolver.updatePerson(TEST_UUID, {})).rejects.toThrow('No fields to update');
    });

    it('should return null if deletePerson called with non-existing id', async () => {
        const result = await resolver.deletePerson('not-found-uuid');
        expect(result).toBeNull();
    });

    it('should throw if prisma throws on update', async () => {
        jest.spyOn(prisma.person, 'update').mockRejectedValueOnce(new Error('Prisma error'));
        await expect(resolver.updatePerson(TEST_UUID, { mass: 100 })).rejects.toThrow('Prisma error');
    });

    it('should throw if createPerson called with empty data', async () => {
        // @ts-expect-error: testing empty input
        await expect(resolver.createPerson({})).rejects.toThrow();
    });
}); 