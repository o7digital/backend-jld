import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CurrentUser } from '../common/user.decorator';
import type { RequestUser } from '../common/user.decorator';
import { SalonService } from './salon.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateSalonProductDto } from './dto/create-product.dto';
import { UpdateSalonProductDto } from './dto/update-product.dto';
import { CreateServiceEntryDto } from './dto/create-service-entry.dto';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { ReportQueryDto } from './dto/report-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get('system/menu')
  getSystemMenu() {
    return this.salonService.getSystemMenu();
  }

  @Post('system/bootstrap-demo')
  bootstrapDemo(@CurrentUser() user: RequestUser) {
    return this.salonService.initializeDemoData(user);
  }

  @Get('branches')
  getBranches(@CurrentUser() user: RequestUser) {
    return this.salonService.getBranches(user);
  }

  @Post('branches')
  createBranch(@Body() dto: CreateBranchDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createBranch(dto, user);
  }

  @Patch('branches/:id')
  updateBranch(@Param('id') id: string, @Body() dto: UpdateBranchDto, @CurrentUser() user: RequestUser) {
    return this.salonService.updateBranch(id, dto, user);
  }

  @Get('collaborators')
  getCollaborators(@CurrentUser() user: RequestUser, @Query('branchId') branchId?: string) {
    return this.salonService.getCollaborators(user, branchId);
  }

  @Post('collaborators')
  createCollaborator(@Body() dto: CreateCollaboratorDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createCollaborator(dto, user);
  }

  @Patch('collaborators/:id')
  updateCollaborator(@Param('id') id: string, @Body() dto: UpdateCollaboratorDto, @CurrentUser() user: RequestUser) {
    return this.salonService.updateCollaborator(id, dto, user);
  }

  @Get('suppliers')
  getSuppliers(@CurrentUser() user: RequestUser) {
    return this.salonService.getSuppliers(user);
  }

  @Post('suppliers')
  createSupplier(@Body() dto: CreateSupplierDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createSupplier(dto, user);
  }

  @Patch('suppliers/:id')
  updateSupplier(@Param('id') id: string, @Body() dto: UpdateSupplierDto, @CurrentUser() user: RequestUser) {
    return this.salonService.updateSupplier(id, dto, user);
  }

  @Get('service-categories')
  getServiceCategories(@CurrentUser() user: RequestUser) {
    return this.salonService.getServiceCategories(user);
  }

  @Post('service-categories')
  createServiceCategory(@Body() dto: CreateServiceCategoryDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createServiceCategory(dto, user);
  }

  @Patch('service-categories/:id')
  updateServiceCategory(
    @Param('id') id: string,
    @Body() dto: UpdateServiceCategoryDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.salonService.updateServiceCategory(id, dto, user);
  }

  @Get('services')
  getServices(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getServices(user, query.categoryId);
  }

  @Post('services')
  createService(@Body() dto: CreateServiceDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createService(dto, user);
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto, @CurrentUser() user: RequestUser) {
    return this.salonService.updateService(id, dto, user);
  }

  @Get('products')
  getProducts(@CurrentUser() user: RequestUser, @Query('branchId') branchId?: string) {
    return this.salonService.getProducts(user, branchId);
  }

  @Post('products')
  createProduct(@Body() dto: CreateSalonProductDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createProduct(dto, user);
  }

  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateSalonProductDto, @CurrentUser() user: RequestUser) {
    return this.salonService.updateProduct(id, dto, user);
  }

  @Post('inventory/movements')
  createInventoryMovement(@Body() dto: CreateInventoryMovementDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createInventoryMovement(user, dto);
  }

  @Get('inventory/history')
  getInventoryHistory(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getInventoryHistory(user, query.branchId, query.productId);
  }

  @Post('service-entries')
  createServiceEntry(@Body() dto: CreateServiceEntryDto, @CurrentUser() user: RequestUser) {
    return this.salonService.createServiceEntry(dto, user);
  }

  @Get('service-entries')
  getServiceEntries(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getServiceEntries(user, query);
  }

  @Get('reports/productivity/individual-concentrated')
  getProductivityIndividualConcentrated(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getProductivityIndividualConcentrated(user, query);
  }

  @Get('reports/productivity/individual-detailed')
  getProductivityIndividualDetailed(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getProductivityIndividualDetailed(user, query);
  }

  @Get('reports/products/internal-consumption-concentrated')
  getInternalConsumptionConcentrated(@CurrentUser() user: RequestUser, @Query() query: ReportQueryDto) {
    return this.salonService.getInternalConsumptionConcentrated(user, query);
  }
}
