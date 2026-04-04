import { IsBoolean, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { OptionalNumber, OptionalTrim, Trim } from './shared';

export class CreateServiceDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @OptionalTrim()
  key?: string;

  @IsString()
  @MaxLength(200)
  @Trim()
  name: string;

  @IsOptional()
  @OptionalNumber()
  @Min(0)
  price1?: number;

  @IsOptional()
  @OptionalNumber()
  @Min(0)
  price2?: number;

  @IsOptional()
  @OptionalNumber()
  @Min(0)
  price3?: number;

  @IsOptional()
  @OptionalNumber()
  @Min(0)
  collaboratorPrice?: number;

  @IsOptional()
  @OptionalNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
