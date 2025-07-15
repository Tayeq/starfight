import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Starship {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    crew: number;
} 