import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        let request: Request;
        if (context.getType<string>() === 'http') {
            request = context.switchToHttp().getRequest();
        } else if (context.getType<string>() === 'graphql') {
            request = GqlExecutionContext.create(context).getContext().req;
        } else {
            throw new UnauthorizedException('Unsupported context type');
        }

        const apiKey = request.headers['x-api-key'];
        if (!apiKey || apiKey !== process.env.API_KEY) {
            throw new UnauthorizedException('Invalid API key');
        }
        return true;
    }
} 