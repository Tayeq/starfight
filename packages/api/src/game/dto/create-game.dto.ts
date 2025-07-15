import { InputType, Field, ID } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { GameResourceType } from '@repo/types';

@InputType()
export class CreateGameDto {
    @Field(() => GameResourceType)
    @IsIn(Object.values(GameResourceType))
    resourceType: GameResourceType;
}

@InputType()
export class PlayRoundDto {
    @Field(() => ID)
    @IsUUID()
    @IsNotEmpty()
    gameId: string;
} 