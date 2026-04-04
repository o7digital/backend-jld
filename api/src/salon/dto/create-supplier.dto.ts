import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { OptionalTrim, Trim } from './shared';

export class CreateSupplierDto {
  @IsString()
  @MaxLength(160)
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  @OptionalTrim()
  executive?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @OptionalTrim()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @OptionalTrim()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @OptionalTrim()
  notes?: string;
}
