import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdatePersonDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    mass?: number;
} 