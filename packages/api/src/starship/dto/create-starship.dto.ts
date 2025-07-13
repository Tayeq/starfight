import { IsString, IsInt } from 'class-validator';

export class CreateStarshipDto {
    @IsString()
    name: string;

    @IsInt()
    crew: number;
} 