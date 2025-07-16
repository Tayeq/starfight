import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
    let guard: ApiKeyGuard;
    const originalEnv = process.env;

    beforeEach(() => {
        guard = new ApiKeyGuard();
        process.env = { ...originalEnv };
        process.env.API_KEY = 'test-api-key';
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    describe('HTTP context', () => {
        it('should allow access with valid API key', () => {
            const mockRequest = {
                headers: { 'x-api-key': 'test-api-key' }
            };
            const mockContext = {
                getType: jest.fn().mockReturnValue('http'),
                switchToHttp: jest.fn().mockReturnValue({
                    getRequest: jest.fn().mockReturnValue(mockRequest)
                })
            } as unknown as ExecutionContext;

            const result = guard.canActivate(mockContext);
            expect(result).toBe(true);
        });

        it('should throw UnauthorizedException with invalid API key', () => {
            const mockRequest = {
                headers: { 'x-api-key': 'invalid-key' }
            };
            const mockContext = {
                getType: jest.fn().mockReturnValue('http'),
                switchToHttp: jest.fn().mockReturnValue({
                    getRequest: jest.fn().mockReturnValue(mockRequest)
                })
            } as unknown as ExecutionContext;

            expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
            expect(() => guard.canActivate(mockContext)).toThrow('Invalid API key');
        });

        it('should throw UnauthorizedException with missing API key', () => {
            const mockRequest = {
                headers: {}
            };
            const mockContext = {
                getType: jest.fn().mockReturnValue('http'),
                switchToHttp: jest.fn().mockReturnValue({
                    getRequest: jest.fn().mockReturnValue(mockRequest)
                })
            } as unknown as ExecutionContext;

            expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
            expect(() => guard.canActivate(mockContext)).toThrow('Invalid API key');
        });
    });

    describe('GraphQL context', () => {
        it('should allow access with valid API key', () => {
            const mockRequest = {
                headers: { 'x-api-key': 'test-api-key' }
            };
            const mockContext = {
                getType: jest.fn().mockReturnValue('graphql')
            } as unknown as ExecutionContext;

            jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
                getContext: jest.fn().mockReturnValue({ req: mockRequest })
            } as any);

            const result = guard.canActivate(mockContext);
            expect(result).toBe(true);
        });

        it('should throw UnauthorizedException with invalid API key in GraphQL', () => {
            const mockRequest = {
                headers: { 'x-api-key': 'invalid-key' }
            };
            const mockContext = {
                getType: jest.fn().mockReturnValue('graphql')
            } as unknown as ExecutionContext;

            jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
                getContext: jest.fn().mockReturnValue({ req: mockRequest })
            } as any);

            expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
            expect(() => guard.canActivate(mockContext)).toThrow('Invalid API key');
        });
    });

    describe('Unsupported context', () => {
        it('should throw UnauthorizedException for unsupported context type', () => {
            const mockContext = {
                getType: jest.fn().mockReturnValue('websocket')
            } as unknown as ExecutionContext;

            expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
            expect(() => guard.canActivate(mockContext)).toThrow('Unsupported context type');
        });
    });
}); 