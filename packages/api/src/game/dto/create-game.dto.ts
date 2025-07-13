import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsIn } from 'class-validator';

export type ResourceType = 'person' | 'starship';

@InputType()
export class CreateGameDto {
    @Field()
    @IsIn(['person', 'starship'])
    resourceType: ResourceType;

    @Field()
    @IsUUID()
    leftId: string;

    @Field()
    @IsUUID()
    rightId: string;
} 