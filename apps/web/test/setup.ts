import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => '/',
}));

// Mock Next.js Link
jest.mock('next/link', () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return React.createElement('a', { href }, children);
    };
});

// Mock React hooks
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useActionState: jest.fn(() => [
        { id: undefined, error: undefined },
        jest.fn(),
    ]),
}));

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    useFormStatus: jest.fn(() => ({ pending: false })),
}));

// Mock sonner toast
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

// Mock fetch
global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
    }),
) as any; 