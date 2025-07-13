import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Game {
    @Field(() => ID)
    id: string;

    @Field()
    resourceType: 'person' | 'starship';

    @Field()
    leftId: string;

    @Field()
    rightId: string;

    @Field(() => Int)
    leftValue: number;

    @Field(() => Int)
    rightValue: number;

    @Field({ nullable: true })
    winnerId: string | null;

    @Field()
    createdAt: Date;
} 