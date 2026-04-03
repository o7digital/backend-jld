import { IsBoolean, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { OptionalNumber, OptionalTrim, Trim } from './shared';

export class CreateSalonProductDto {
  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @OptionalTrim()
  code?: string;

  @IsString()
  @MaxLength(200)
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  @OptionalTrim()
  line?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  @OptionalTrim()
  brand?: string;

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
  @OptionalNumber()
  stock?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
