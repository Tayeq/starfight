import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('starships')
export class StarshipsController {
    constructor(private readonly prisma: PrismaService) { }

    @Post()
    create(@Body() createStarshipDto: { name: string; crew: number }) {
        return this.prisma.starship.create({ data: createStarshipDto });
    }

    @Get()
    findAll() {
        return this.prisma.starship.findMany();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.prisma.starship.findUnique({ where: { id } });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStarshipDto: { name?: string; crew?: number }) {
        return this.prisma.starship.update({ where: { id }, data: updateStarshipDto });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.prisma.starship.delete({ where: { id } });
    }
} 