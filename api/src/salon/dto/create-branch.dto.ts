import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { OptionalTrim, Trim } from './shared';

export class CreateBranchDto {
  @IsString()
  @MaxLength(160)
  @Trim()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @OptionalTrim()
  licenseCode?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
