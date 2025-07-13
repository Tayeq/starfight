import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';

@ObjectType()
export class Person {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    mass: number;
}

@InputType()
export class CreatePersonInput {
    @Field()
    name: string;

    @Field()
    mass: number;
}

@InputType()
export class UpdatePersonInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mass?: number;
}

@Resolver(() => Person)
export class PeopleResolver {
    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Person], { name: 'people' })
    async people() {
        return this.prisma.person.findMany();
    }

    @Query(() => Person, { nullable: true, name: 'person' })
    async person(@Args('id', { type: () => String }) id: string) {
        return this.prisma.person.findUnique({ where: { id } });
    }

    @Mutation(() => Person, { name: 'createPerson' })
    async createPerson(@Args('data') data: CreatePersonInput) {
        if (!data.name || typeof data.mass !== 'number') {
            throw new Error('Invalid input');
        }
        return this.prisma.person.create({ data });
    }

    @Mutation(() => Person, { name: 'updatePerson' })
    async updatePerson(
        @Args('id') id: string,
        @Args('data') data: UpdatePersonInput,
    ) {
        if (data.name === undefined && data.mass === undefined) {
            throw new Error('No fields to update');
        }
        return this.prisma.person.update({ where: { id }, data });
    }

    @Mutation(() => Person, { name: 'deletePerson' })
    async deletePerson(@Args('id') id: string) {
        return this.prisma.person.delete({ where: { id } });
    }
} 