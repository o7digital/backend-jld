import { IsDate, IsOptional, IsString } from 'class-validator';
import { OptionalDate } from './shared';

export class ReportQueryDto {
  @IsOptional()
  @OptionalDate()
  @IsDate()
  from?: Date;

  @IsOptional()
  @OptionalDate()
  @IsDate()
  to?: Date;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  collaboratorId?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
