import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty } from 'class-validator';

@InputType()
export class PlayRoundDto {
    @Field(() => ID)
    @IsUUID()
    @IsNotEmpty()
    gameId: string;
} 