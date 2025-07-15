import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

jest.mock('@nestjs/core');

const listenMock = jest.fn();
const useGlobalPipesMock = jest.fn();
const useGlobalGuardsMock = jest.fn();

(NestFactory.create as jest.Mock).mockResolvedValue({
    useGlobalPipes: useGlobalPipesMock,
    useGlobalGuards: useGlobalGuardsMock,
    listen: listenMock,
});

describe('main bootstrap', () => {
    it('should bootstrap the app and call listen', async () => {
        // Importujemy main dynamicznie, żeby wykonał się kod bootstrapa
        await import('./main');
        expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
        expect(useGlobalPipesMock).toHaveBeenCalledWith(expect.any(ValidationPipe));
        expect(useGlobalGuardsMock).toHaveBeenCalled();
        expect(listenMock).toHaveBeenCalledWith(3000);
    });
}); 