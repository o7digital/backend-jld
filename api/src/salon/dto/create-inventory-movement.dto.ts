import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { SalonInventoryMovementType } from '@prisma/client';
import { OptionalNumber, OptionalTrim } from './shared';

export class CreateInventoryMovementDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsEnum(SalonInventoryMovementType)
  type: SalonInventoryMovementType;

  @OptionalNumber()
  @IsNumber()
  @Min(0.001)
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @OptionalTrim()
  reason?: string;
}
