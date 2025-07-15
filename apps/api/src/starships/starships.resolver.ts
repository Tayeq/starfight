import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Starship } from '@repo/api/starship/entities/starship.entity';
import { InputType, Field, ID } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';

@InputType()
export class CreateStarshipInput {
    @Field()
    name: string;

    @Field()
    crew: number;
}

@InputType()
export class UpdateStarshipInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    crew?: number;
}

@Resolver(() => Starship)
export class StarshipsResolver {
    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Starship], { name: 'starships' })
    async starships() {
        return this.prisma.starship.findMany();
    }

    @Query(() => Starship, { nullable: true, name: 'starship' })
    async starship(@Args('id', { type: () => String }) id: string) {
        return this.prisma.starship.findUnique({ where: { id } });
    }

    @Mutation(() => Starship, { name: 'createStarship' })
    async createStarship(@Args('data') data: CreateStarshipInput) {
        if (!data.name || typeof data.crew !== 'number') {
            throw new Error('Invalid input');
        }
        return this.prisma.starship.create({ data });
    }

    @Mutation(() => Starship, { name: 'updateStarship' })
    async updateStarship(
        @Args('id') id: string,
        @Args('data') data: UpdateStarshipInput,
    ) {
        if (data.name === undefined && data.crew === undefined) {
            throw new Error('No fields to update');
        }
        return this.prisma.starship.update({ where: { id }, data });
    }

    @Mutation(() => Starship, { name: 'deleteStarship' })
    async deleteStarship(@Args('id') id: string) {
        return this.prisma.starship.delete({ where: { id } });
    }
} 