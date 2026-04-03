import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { OptionalNumber, OptionalTrim, Trim } from './shared';

export class CreateCollaboratorDto {
  @IsString()
  branchId: string;

  @IsOptional()
  @OptionalNumber()
  @IsInt()
  code?: number;

  @IsString()
  @MaxLength(160)
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  @OptionalTrim()
  roleLabel?: string;

  @IsOptional()
  @IsEmail()
  @OptionalTrim()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @OptionalTrim()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
