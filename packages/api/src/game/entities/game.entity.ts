import { ObjectType, Field, ID, registerEnumType, createUnionType } from '@nestjs/graphql';
import { GameResourceType } from '@repo/types';
import { Person } from '@repo/api/person/entities/person.entity';
import { Starship } from '@repo/api/starship/entities/starship.entity';

registerEnumType(GameResourceType, { name: 'ResourceType' });

export const ResourceUnion = createUnionType({
    name: 'ResourceUnion',
    types: () => [Person, Starship] as const,
    resolveType(value) {
        if ('mass' in value) {
            return Person;
        }
        if ('crew' in value) {
            return Starship;
        }
        return null;
    },
});

@ObjectType()
export class Game {
    @Field(() => ID)
    id: string;

    @Field(() => GameResourceType)
    resourceType: GameResourceType;

    @Field()
    createdAt: Date;

    @Field(() => [Round], { nullable: true })
    rounds?: Round[];
}

@ObjectType()
export class Round {
    @Field(() => ID)
    id: string;

    @Field()
    gameId: string;

    @Field()
    leftId: string;

    @Field()
    rightId: string;

    @Field()
    leftValue: number;

    @Field()
    rightValue: number;

    @Field({ nullable: true })
    winnerId?: string;

    @Field()
    createdAt: Date;

    @Field(() => ResourceUnion, { nullable: true })
    left?: typeof ResourceUnion;

    @Field(() => ResourceUnion, { nullable: true })
    right?: typeof ResourceUnion;

    @Field(() => ResourceUnion, { nullable: true })
    winner?: typeof ResourceUnion;
}    