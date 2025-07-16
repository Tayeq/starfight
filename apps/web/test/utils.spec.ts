import { describe, it, expect } from '@jest/globals';
import { GameResourceType } from '@repo/types';

// Simple utility functions that can be tested easily
function getResourceDisplayName(type: GameResourceType): string {
    switch (type) {
        case GameResourceType.PERSON:
            return 'People';
        case GameResourceType.STARSHIP:
            return 'Starships';
        default:
            return 'Unknown';
    }
}

function calculateWinPercentage(wins: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
}

function formatGameDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

describe('Utility Functions', () => {
    describe('getResourceDisplayName', () => {
        it('should return "People" for PERSON type', () => {
            expect(getResourceDisplayName(GameResourceType.PERSON)).toBe('People');
        });

        it('should return "Starships" for STARSHIP type', () => {
            expect(getResourceDisplayName(GameResourceType.STARSHIP)).toBe('Starships');
        });

        it('should return "Unknown" for unknown type', () => {
            expect(getResourceDisplayName('UNKNOWN' as GameResourceType)).toBe('Unknown');
        });
    });

    describe('calculateWinPercentage', () => {
        it('should calculate correct percentage', () => {
            expect(calculateWinPercentage(3, 10)).toBe(30);
            expect(calculateWinPercentage(7, 10)).toBe(70);
            expect(calculateWinPercentage(1, 3)).toBe(33);
        });

        it('should return 0 for zero total', () => {
            expect(calculateWinPercentage(5, 0)).toBe(0);
        });

        it('should return 100 for all wins', () => {
            expect(calculateWinPercentage(5, 5)).toBe(100);
        });

        it('should return 0 for no wins', () => {
            expect(calculateWinPercentage(0, 5)).toBe(0);
        });
    });

    describe('formatGameDate', () => {
        it('should format date correctly', () => {
            const date = new Date('2023-12-25T10:30:00Z');
            const formatted = formatGameDate(date);
            expect(formatted).toMatch(/Dec 25, 2023/);
        });

        it('should handle different dates', () => {
            const date = new Date('2024-01-01T00:00:00Z');
            const formatted = formatGameDate(date);
            expect(formatted).toMatch(/Jan 1, 2024/);
        });
    });
}); 