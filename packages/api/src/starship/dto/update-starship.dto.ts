import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateStarshipDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    crew?: number;
} 