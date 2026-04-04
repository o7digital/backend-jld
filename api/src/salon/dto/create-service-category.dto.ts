import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { OptionalNumber, Trim } from './shared';

export class CreateServiceCategoryDto {
  @IsOptional()
  @IsString()
  branchId?: string;

  @OptionalNumber()
  @IsInt()
  @Min(1)
  @Max(999)
  position: number;

  @IsString()
  @Trim()
  name: string;
}
