import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PrismaService } from '../prisma.service';
import { createPersonPrismaMock, TEST_UUID, TEST_PERSON } from './people.mock';

describe('PeopleController', () => {
    let controller: PeopleController;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PeopleController],
            providers: [
                { provide: PrismaService, useValue: { person: createPersonPrismaMock() } },
            ],
        }).compile();
        controller = module.get<PeopleController>(PeopleController);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a person', async () => {
        const result = await controller.create({ name: 'Test', mass: 99 });
        expect(result).toEqual(TEST_PERSON);
    });

    it('should return all people', async () => {
        const result = await controller.findAll();
        expect(result).toEqual([TEST_PERSON]);
    });

    it('should return a person by id', async () => {
        const result = await controller.findOne(TEST_UUID);
        expect(result).toEqual(TEST_PERSON);
    });

    it('should update a person', async () => {
        const result = await controller.update(TEST_UUID, { mass: 100 });
        expect(result).toEqual({ id: TEST_UUID, name: 'Test', mass: 100 });
    });

    it('should delete a person', async () => {
        const result = await controller.remove(TEST_UUID);
        expect(result).toEqual(TEST_PERSON);
    });
}); 