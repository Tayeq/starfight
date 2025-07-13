export const TEST_UUID = '123e4567-e89b-12d3-a456-426614174001';
export const TEST_PERSON = { id: TEST_UUID, name: 'Test', mass: 99 };

export function createPersonPrismaMock(overrides = {}) {
    return {
        findMany: jest.fn().mockResolvedValue([TEST_PERSON]),
        findUnique: jest.fn().mockImplementation((args) => args.where.id === TEST_UUID ? TEST_PERSON : null),
        create: jest.fn().mockImplementation((args) => {
            if (!args.data.name || typeof args.data.mass !== 'number') throw new Error('Invalid input');
            return { id: TEST_UUID, name: args.data.name, mass: args.data.mass };
        }),
        update: jest.fn().mockImplementation((args) => {
            if (!args.data || (args.data.name === undefined && args.data.mass === undefined)) throw new Error('No fields to update');
            return { id: args.where.id, name: args.data.name ?? 'Test', mass: args.data.mass ?? 99 };
        }),
        delete: jest.fn().mockImplementation((args) => {
            if (args.where.id !== TEST_UUID) return null;
            return TEST_PERSON;
        }),
        ...overrides,
    };
} 