import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { OptionalDate, OptionalNumber, OptionalTrim, Trim } from './shared';

class ServiceEntryConsumptionDto {
  @IsString()
  productId: string;

  @OptionalNumber()
  @IsNumber()
  quantity: number;
}

export class CreateServiceEntryDto {
  @IsString()
  branchId: string;

  @IsString()
  collaboratorId: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsString()
  @MaxLength(200)
  @Trim()
  serviceName: string;

  @IsString()
  @MaxLength(200)
  @Trim()
  clientName: string;

  @IsOptional()
  @OptionalNumber()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  quantity?: number;

  @OptionalNumber()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;

  @IsOptional()
  @OptionalNumber()
  @IsInt()
  @Min(1)
  durationMinutes?: number;

  @OptionalDate()
  @IsDate()
  happenedAt: Date;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @OptionalTrim()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceEntryConsumptionDto)
  consumptions?: ServiceEntryConsumptionDto[];
}
