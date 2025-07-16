import { InputType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { GameResourceType } from '@repo/types';

@InputType()
export class CreateGameDto {
    @Field(() => GameResourceType)
    @IsIn(Object.values(GameResourceType))
    resourceType: GameResourceType;
}
