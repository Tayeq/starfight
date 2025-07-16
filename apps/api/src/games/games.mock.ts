export const TEST_GAME_ID = '11111111-1111-1111-1111-111111111111';
export const TEST_GAME = {
    id: TEST_GAME_ID,
    resourceType: 'PERSON',
    leftId: 'p1',
    rightId: 'p2',
    leftValue: 80,
    rightValue: 120,
    winnerId: 'p2',
    createdAt: new Date(),
};

export const TEST_ROUND_ID = '22222222-2222-2222-2222-222222222222';
export const TEST_ROUND = {
    id: TEST_ROUND_ID,
    gameId: TEST_GAME_ID,
    leftId: 'p1',
    rightId: 'p2',
    leftValue: 80,
    rightValue: 120,
    winnerId: 'p2',
    createdAt: new Date(),
};

export function createGamesPrismaMock(overrides = {}) {
    return {
        create: jest.fn().mockImplementation(({ data }) => ({ ...data, id: TEST_GAME_ID, createdAt: new Date() })),
        findUnique: jest.fn().mockResolvedValue(TEST_GAME),
        findMany: jest.fn().mockResolvedValue([TEST_GAME]),
        // brakujące metody Prisma
        findUniqueOrThrow: jest.fn(),
        findFirst: jest.fn(),
        findFirstOrThrow: jest.fn(),
        createMany: jest.fn(),
        createManyAndReturn: jest.fn(),
        updateManyAndReturn: jest.fn(),
        fields: {
            id: true,
            resourceType: true,
            leftId: true,
            rightId: true,
            leftValue: true,
            rightValue: true,
            winnerId: true,
            createdAt: true,
        },
        update: jest.fn(),
        updateMany: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        aggregate: jest.fn(),
        groupBy: jest.fn(),
        count: jest.fn(),
        ...overrides,
    };
}

export function createRoundPrismaMock(overrides = {}) {
    return {
        create: jest.fn().mockImplementation(({ data }) => ({ ...data, id: TEST_ROUND_ID, createdAt: new Date() })),
        findMany: jest.fn().mockResolvedValue([TEST_ROUND]),
        ...overrides,
    };
}

export function createPersonPrismaMock(overrides = {}) {
    return {
        findMany: jest.fn().mockResolvedValue([
            { id: 'p1', name: 'Luke', mass: 80 },
            { id: 'p2', name: 'Vader', mass: 120 },
        ]),
        findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
            if (id === 'p1') return Promise.resolve({ id: 'p1', name: 'Luke', mass: 80 });
            if (id === 'p2') return Promise.resolve({ id: 'p2', name: 'Vader', mass: 120 });
            return Promise.resolve(null);
        }),
        create: jest.fn().mockImplementation(({ data }) => Promise.resolve({ ...data, id: 'p1' })),
        update: jest.fn().mockImplementation(({ where: { id }, data }) => Promise.resolve({ id, ...data })),
        delete: jest.fn().mockImplementation(({ where: { id } }) => Promise.resolve(id === 'p1' ? { id: 'p1', name: 'Luke', mass: 80 } : null)),
        // brakujące metody Prisma
        findUniqueOrThrow: jest.fn(),
        findFirst: jest.fn(),
        findFirstOrThrow: jest.fn(),
        createMany: jest.fn(),
        updateMany: jest.fn(),
        upsert: jest.fn(),
        deleteMany: jest.fn(),
        aggregate: jest.fn(),
        groupBy: jest.fn(),
        count: jest.fn(),
        fields: {
            id: true,
            name: true,
            mass: true,
        },
        ...overrides,
    };
}

export function createStarshipPrismaMock(overrides = {}) {
    return {
        findMany: jest.fn().mockResolvedValue([
            { id: 's1', name: 'X-Wing', crew: 1 },
            { id: 's2', name: 'Falcon', crew: 4 },
        ]),
        findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
            if (id === 's1') return Promise.resolve({ id: 's1', name: 'X-Wing', crew: 1 });
            if (id === 's2') return Promise.resolve({ id: 's2', name: 'Falcon', crew: 4 });
            return Promise.resolve(null);
        }),
        create: jest.fn().mockImplementation(({ data }) => Promise.resolve({ ...data, id: 's1' })),
        update: jest.fn().mockImplementation(({ where: { id }, data }) => Promise.resolve({ id, ...data })),
        delete: jest.fn().mockImplementation(({ where: { id } }) => Promise.resolve(id === 's1' ? { id: 's1', name: 'X-Wing', crew: 1 } : null)),
        // brakujące metody Prisma
        findUniqueOrThrow: jest.fn(),
        findFirst: jest.fn(),
        findFirstOrThrow: jest.fn(),
        createMany: jest.fn(),
        updateMany: jest.fn(),
        upsert: jest.fn(),
        deleteMany: jest.fn(),
        aggregate: jest.fn(),
        groupBy: jest.fn(),
        count: jest.fn(),
        fields: {
            id: true,
            name: true,
            crew: true,
        },
        ...overrides,
    };
} 