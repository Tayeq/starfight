export const TEST_GAME_ID = '11111111-1111-1111-1111-111111111111';
export const TEST_GAME = {
    id: TEST_GAME_ID,
    resourceType: 'person',
    leftId: 'p1',
    rightId: 'p2',
    leftValue: 80,
    rightValue: 120,
    winnerId: 'p2',
    createdAt: new Date(),
};

export function createGamePrismaMock(overrides = {}) {
    return {
        create: jest.fn().mockImplementation(({ data }) => ({ ...data, id: TEST_GAME_ID, createdAt: new Date() })),
        findUnique: jest.fn().mockResolvedValue(TEST_GAME),
        findMany: jest.fn().mockResolvedValue([TEST_GAME]),
        ...overrides,
    };
} 