import { PartialType } from '@nestjs/mapped-types';
import { CreateSalonProductDto } from './create-product.dto';

export class UpdateSalonProductDto extends PartialType(CreateSalonProductDto) {}
