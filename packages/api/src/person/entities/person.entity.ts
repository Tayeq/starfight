import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Person {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    mass: number;
} 