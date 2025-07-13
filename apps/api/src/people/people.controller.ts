import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('people')
export class PeopleController {
    constructor(private readonly prisma: PrismaService) { }

    @Post()
    create(@Body() createPersonDto: { name: string; mass: number }) {
        return this.prisma.person.create({ data: createPersonDto });
    }

    @Get()
    findAll() {
        return this.prisma.person.findMany();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.prisma.person.findUnique({ where: { id } });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: { name?: string; mass?: number }) {
        return this.prisma.person.update({ where: { id }, data: updatePersonDto });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.prisma.person.delete({ where: { id } });
    }
} 