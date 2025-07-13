export const TEST_UUID = '123e4567-e89b-12d3-a456-426614174000';
export const TEST_STARSHIP = { id: TEST_UUID, name: 'TestShip', crew: 5 };

export function createStarshipPrismaMock(overrides = {}) {
    return {
        findMany: jest.fn().mockResolvedValue([TEST_STARSHIP]),
        findUnique: jest.fn().mockImplementation((args) => args.where.id === TEST_UUID ? TEST_STARSHIP : null),
        create: jest.fn().mockImplementation((args) => {
            if (!args.data.name || typeof args.data.crew !== 'number') throw new Error('Invalid input');
            return { id: TEST_UUID, name: args.data.name, crew: args.data.crew };
        }),
        update: jest.fn().mockImplementation((args) => {
            if (!args.data || (args.data.name === undefined && args.data.crew === undefined)) throw new Error('No fields to update');
            return { id: args.where.id, name: args.data.name ?? 'TestShip', crew: args.data.crew ?? 5 };
        }),
        delete: jest.fn().mockImplementation((args) => {
            if (args.where.id !== TEST_UUID) return null;
            return TEST_STARSHIP;
        }),
        ...overrides,
    };
} 