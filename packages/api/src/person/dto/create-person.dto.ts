import { IsString, IsInt } from 'class-validator';

export class CreatePersonDto {
    @IsString()
    name: string;

    @IsInt()
    mass: number;
} 