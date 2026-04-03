import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SalonInventoryMovementType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RequestUser } from '../common/user.decorator';
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

@Injectable()
export class SalonService {
  constructor(private readonly prisma: PrismaService) {}

  getSystemMenu() {
    return {
      modules: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          sections: ['KPI generales', 'Alertas', 'Resumen sucursal'],
        },
        {
          key: 'productividad',
          label: 'Productividad',
          sections: [
            'Productividad sucursal',
            'Productividad acumulada',
            'Productividad individual detallada',
            'Productividad individual concentrada',
            'Estadísticos servicios',
            'Estadísticos producto',
          ],
        },
        {
          key: 'producto',
          label: 'Producto',
          sections: [
            'Inventario sucursal',
            'Ajustar inventario',
            'Detalle ajuste inventario',
            'Historial de compras',
            'Detalle consumo interno',
            'Concentrado consumo interno',
            'Pedidos',
          ],
        },
        {
          key: 'clientes',
          label: 'Clientes',
          sections: [
            'Analisis clientes',
            'Historial de clientes',
            'Listado de sesiones',
            'Listado de clientes',
            'Cumpleanos',
            'Encuesta de satisfaccion',
            'Reporte de citas canceladas',
            'Consulta agenda sucursal',
          ],
        },
        {
          key: 'catalogos',
          label: 'Catalogos',
          sections: ['Sucursales', 'Colaboradores', 'Servicios', 'Clasificacion servicios', 'Productos', 'Proveedores'],
        },
      ],
    };
  }

  async initializeDemoData(user: RequestUser) {
    const existingBranches = await this.prisma.salonBranch.count({ where: { tenantId: user.tenantId } });
    if (existingBranches > 0) {
      return { ok: true, created: false, message: 'Demo data already initialized' };
    }

    const branchSantaFe = await this.prisma.salonBranch.create({
      data: {
        tenantId: user.tenantId,
        name: 'JEAN LOUIS DAVID SANTA FE',
        licenseCode: '15JL25G2511',
      },
    });

    await this.prisma.salonBranch.createMany({
      data: [
        { tenantId: user.tenantId, name: 'JEAN LOUIS DAVID POLANCO', licenseCode: '15JL25G2502' },
        { tenantId: user.tenantId, name: 'BODEGA SANTA FE', licenseCode: '15JL25G2513' },
      ],
      skipDuplicates: true,
    });

    const collaborators = await Promise.all(
      [
        { name: 'JUAN RESENDIZ', code: 126 },
        { name: 'JUANA GONZALEZ', code: 23 },
        { name: 'MADELEIN COLIN', code: 118 },
        { name: 'OMAR SALGADO RECEPCION', code: 100 },
      ].map((item) =>
        this.prisma.salonCollaborator.create({
          data: {
            tenantId: user.tenantId,
            branchId: branchSantaFe.id,
            name: item.name,
            code: item.code,
          },
        }),
      ),
    );

    const [colorCategory, manicureCategory, corteCategory] = await Promise.all([
      this.prisma.salonServiceCategory.create({
        data: { tenantId: user.tenantId, position: 11, name: 'COLOR' },
      }),
      this.prisma.salonServiceCategory.create({
        data: { tenantId: user.tenantId, position: 6, name: 'MANICURE/PEDICURE' },
      }),
      this.prisma.salonServiceCategory.create({
        data: { tenantId: user.tenantId, position: 1, name: 'CORTE' },
      }),
    ]);

    const services = await Promise.all([
      this.prisma.salonService.create({
        data: {
          tenantId: user.tenantId,
          categoryId: corteCategory.id,
          key: 'CORTE DAMA',
          name: 'CORTE DAMA',
          price1: 1200,
        },
      }),
      this.prisma.salonService.create({
        data: {
          tenantId: user.tenantId,
          categoryId: colorCategory.id,
          key: 'DIALIGHT RICHESSE',
          name: 'DIALIGHT RICHESSE',
          price1: 1100,
        },
      }),
      this.prisma.salonService.create({
        data: {
          tenantId: user.tenantId,
          categoryId: manicureCategory.id,
          key: 'PEDICURA',
          name: 'PEDICURA',
          price1: 477,
        },
      }),
    ]);

    const supplier = await this.prisma.salonSupplier.create({
      data: {
        tenantId: user.tenantId,
        name: 'BRAZILIAN',
        executive: 'MAYALLI CORTES Y NUBIA ZAMUDIO',
      },
    });

    const product = await this.prisma.salonProduct.create({
      data: {
        tenantId: user.tenantId,
        branchId: branchSantaFe.id,
        supplierId: supplier.id,
        code: '20250002',
        name: 'ACAI IONIC BONDING SPRAY 100ML',
        line: 'BRAZILIAN',
        brand: 'BRAZILIAN',
        price1: 900,
        collaboratorPrice: 630,
        cost: 481.89,
        stock: 1,
      },
    });

    await this.prisma.salonInventoryMovement.create({
      data: {
        tenantId: user.tenantId,
        branchId: branchSantaFe.id,
        productId: product.id,
        type: SalonInventoryMovementType.PURCHASE,
        quantity: 1,
        reason: 'Inventario inicial demo',
        createdById: user.userId,
      },
    });

    await this.prisma.salonServiceEntry.createMany({
      data: [
        {
          tenantId: user.tenantId,
          branchId: branchSantaFe.id,
          collaboratorId: collaborators[0].id,
          serviceId: services[0].id,
          serviceName: 'CORTE DAMA',
          clientName: 'MAGDA MARTINEZ',
          quantity: 1,
          amount: 1200,
          happenedAt: new Date('2026-03-03T10:00:00.000Z'),
          durationMinutes: 45,
        },
        {
          tenantId: user.tenantId,
          branchId: branchSantaFe.id,
          collaboratorId: collaborators[0].id,
          serviceId: services[1].id,
          serviceName: 'DIALIGHT RICHESSE',
          clientName: 'ANDREA CERTUCHA',
          quantity: 1,
          amount: 1100,
          happenedAt: new Date('2026-03-03T11:00:00.000Z'),
          durationMinutes: 60,
        },
        {
          tenantId: user.tenantId,
          branchId: branchSantaFe.id,
          collaboratorId: collaborators[1].id,
          serviceId: services[2].id,
          serviceName: 'PEDICURA',
          clientName: 'ANA DURAN',
          quantity: 1,
          amount: 477,
          happenedAt: new Date('2026-03-05T14:00:00.000Z'),
          durationMinutes: 50,
        },
      ],
    });

    return { ok: true, created: true };
  }

  async getBranches(user: RequestUser) {
    return this.prisma.salonBranch.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async createBranch(dto: CreateBranchDto, user: RequestUser) {
    return this.prisma.salonBranch.create({ data: { ...dto, tenantId: user.tenantId } });
  }

  async updateBranch(id: string, dto: UpdateBranchDto, user: RequestUser) {
    await this.ensureBranchBelongs(id, user);
    return this.prisma.salonBranch.update({ where: { id }, data: dto });
  }

  async getCollaborators(user: RequestUser, branchId?: string) {
    return this.prisma.salonCollaborator.findMany({
      where: {
        tenantId: user.tenantId,
        ...(branchId ? { branchId } : {}),
      },
      include: {
        branch: { select: { id: true, name: true } },
      },
      orderBy: [{ branch: { name: 'asc' } }, { name: 'asc' }],
    });
  }

  async createCollaborator(dto: CreateCollaboratorDto, user: RequestUser) {
    await this.ensureBranchBelongs(dto.branchId, user);
    return this.prisma.salonCollaborator.create({
      data: {
        ...dto,
        tenantId: user.tenantId,
      },
    });
  }

  async updateCollaborator(id: string, dto: UpdateCollaboratorDto, user: RequestUser) {
    await this.ensureCollaboratorBelongs(id, user);
    if (dto.branchId) await this.ensureBranchBelongs(dto.branchId, user);
    return this.prisma.salonCollaborator.update({ where: { id }, data: dto });
  }

  async getSuppliers(user: RequestUser) {
    return this.prisma.salonSupplier.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async createSupplier(dto: CreateSupplierDto, user: RequestUser) {
    return this.prisma.salonSupplier.create({ data: { ...dto, tenantId: user.tenantId } });
  }

  async updateSupplier(id: string, dto: UpdateSupplierDto, user: RequestUser) {
    await this.ensureSupplierBelongs(id, user);
    return this.prisma.salonSupplier.update({ where: { id }, data: dto });
  }

  async getServiceCategories(user: RequestUser) {
    return this.prisma.salonServiceCategory.findMany({
      where: { tenantId: user.tenantId },
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
    });
  }

  async createServiceCategory(dto: CreateServiceCategoryDto, user: RequestUser) {
    return this.prisma.salonServiceCategory.create({ data: { ...dto, tenantId: user.tenantId } });
  }

  async updateServiceCategory(id: string, dto: UpdateServiceCategoryDto, user: RequestUser) {
    await this.ensureServiceCategoryBelongs(id, user);
    return this.prisma.salonServiceCategory.update({ where: { id }, data: dto });
  }

  async getServices(user: RequestUser, categoryId?: string) {
    return this.prisma.salonService.findMany({
      where: {
        tenantId: user.tenantId,
        ...(categoryId ? { categoryId } : {}),
      },
      include: {
        category: { select: { id: true, name: true, position: true } },
      },
      orderBy: [{ category: { position: 'asc' } }, { name: 'asc' }],
    });
  }

  async createService(dto: CreateServiceDto, user: RequestUser) {
    if (dto.categoryId) await this.ensureServiceCategoryBelongs(dto.categoryId, user);
    return this.prisma.salonService.create({
      data: {
        ...dto,
        tenantId: user.tenantId,
      },
    });
  }

  async updateService(id: string, dto: UpdateServiceDto, user: RequestUser) {
    await this.ensureServiceBelongs(id, user);
    if (dto.categoryId) await this.ensureServiceCategoryBelongs(dto.categoryId, user);
    return this.prisma.salonService.update({ where: { id }, data: dto });
  }

  async getProducts(user: RequestUser, branchId?: string) {
    return this.prisma.salonProduct.findMany({
      where: {
        tenantId: user.tenantId,
        ...(branchId ? { branchId } : {}),
      },
      include: {
        branch: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
      },
      orderBy: [{ name: 'asc' }],
    });
  }

  async createProduct(dto: CreateSalonProductDto, user: RequestUser) {
    if (dto.branchId) await this.ensureBranchBelongs(dto.branchId, user);
    if (dto.supplierId) await this.ensureSupplierBelongs(dto.supplierId, user);

    return this.prisma.salonProduct.create({
      data: {
        ...dto,
        tenantId: user.tenantId,
      },
    });
  }

  async updateProduct(id: string, dto: UpdateSalonProductDto, user: RequestUser) {
    await this.ensureProductBelongs(id, user);
    if (dto.branchId) await this.ensureBranchBelongs(dto.branchId, user);
    if (dto.supplierId) await this.ensureSupplierBelongs(dto.supplierId, user);

    return this.prisma.salonProduct.update({ where: { id }, data: dto });
  }

  async createInventoryMovement(
    user: RequestUser,
    input: {
      productId: string;
      branchId?: string;
      type: SalonInventoryMovementType;
      quantity: number;
      reason?: string;
    },
  ) {
    await this.ensureProductBelongs(input.productId, user);
    if (input.branchId) await this.ensureBranchBelongs(input.branchId, user);

    const movement = await this.prisma.salonInventoryMovement.create({
      data: {
        tenantId: user.tenantId,
        productId: input.productId,
        branchId: input.branchId,
        type: input.type,
        quantity: input.quantity,
        reason: input.reason,
        createdById: user.userId,
      },
    });

    const delta = ['PURCHASE', 'TRANSFER_IN'].includes(input.type)
      ? input.quantity
      : -1 * Math.abs(input.quantity);

    await this.prisma.$executeRaw`
      UPDATE "SalonProduct"
      SET "stock" = COALESCE("stock", 0) + ${delta}
      WHERE "id" = ${input.productId}
        AND "tenantId" = ${user.tenantId}
    `;

    return movement;
  }

  async getInventoryHistory(user: RequestUser, branchId?: string, productId?: string) {
    return this.prisma.salonInventoryMovement.findMany({
      where: {
        tenantId: user.tenantId,
        ...(branchId ? { branchId } : {}),
        ...(productId ? { productId } : {}),
      },
      include: {
        product: { select: { id: true, name: true, code: true } },
        branch: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
  }

  async createServiceEntry(dto: CreateServiceEntryDto, user: RequestUser) {
    await this.ensureBranchBelongs(dto.branchId, user);
    await this.ensureCollaboratorBelongs(dto.collaboratorId, user);
    if (dto.serviceId) await this.ensureServiceBelongs(dto.serviceId, user);

    if (dto.consumptions?.length) {
      const products = await this.prisma.salonProduct.findMany({
        where: { tenantId: user.tenantId, id: { in: dto.consumptions.map((item) => item.productId) } },
        select: { id: true },
      });
      const ids = new Set(products.map((item) => item.id));
      for (const item of dto.consumptions) {
        if (!ids.has(item.productId)) {
          throw new NotFoundException(`Product not found: ${item.productId}`);
        }
      }
    }

    const entry = await this.prisma.salonServiceEntry.create({
      data: {
        tenantId: user.tenantId,
        branchId: dto.branchId,
        collaboratorId: dto.collaboratorId,
        clientId: dto.clientId,
        serviceId: dto.serviceId,
        serviceName: dto.serviceName,
        clientName: dto.clientName,
        quantity: dto.quantity ?? 1,
        amount: dto.amount,
        durationMinutes: dto.durationMinutes,
        happenedAt: dto.happenedAt,
        notes: dto.notes,
        consumptions: dto.consumptions as Prisma.JsonArray | undefined,
      },
      include: {
        branch: { select: { id: true, name: true } },
        collaborator: { select: { id: true, name: true } },
        service: { select: { id: true, name: true } },
      },
    });

    for (const item of dto.consumptions ?? []) {
      await this.createInventoryMovement(user, {
        productId: item.productId,
        branchId: dto.branchId,
        type: SalonInventoryMovementType.CONSUMPTION,
        quantity: Math.abs(item.quantity),
        reason: `Consumo por servicio ${dto.serviceName}`,
      });
    }

    return entry;
  }

  async getServiceEntries(user: RequestUser, params: { from?: Date; to?: Date; branchId?: string; collaboratorId?: string }) {
    const where: Prisma.SalonServiceEntryWhereInput = {
      tenantId: user.tenantId,
      ...(params.branchId ? { branchId: params.branchId } : {}),
      ...(params.collaboratorId ? { collaboratorId: params.collaboratorId } : {}),
      ...(params.from || params.to
        ? {
            happenedAt: {
              ...(params.from ? { gte: params.from } : {}),
              ...(params.to ? { lte: params.to } : {}),
            },
          }
        : {}),
    };

    return this.prisma.salonServiceEntry.findMany({
      where,
      include: {
        branch: { select: { id: true, name: true } },
        collaborator: { select: { id: true, name: true } },
      },
      orderBy: { happenedAt: 'desc' },
      take: 2000,
    });
  }

  async getProductivityIndividualConcentrated(
    user: RequestUser,
    params: { from?: Date; to?: Date; branchId?: string; collaboratorId?: string },
  ) {
    const result = await this.prisma.salonServiceEntry.groupBy({
      by: ['collaboratorId', 'serviceName'],
      where: {
        tenantId: user.tenantId,
        ...(params.branchId ? { branchId: params.branchId } : {}),
        ...(params.collaboratorId ? { collaboratorId: params.collaboratorId } : {}),
        ...(params.from || params.to
          ? {
              happenedAt: {
                ...(params.from ? { gte: params.from } : {}),
                ...(params.to ? { lte: params.to } : {}),
              },
            }
          : {}),
      },
      _sum: {
        quantity: true,
        amount: true,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    const collaboratorIds = Array.from(new Set(result.map((item) => item.collaboratorId)));
    const collaborators = collaboratorIds.length
      ? await this.prisma.salonCollaborator.findMany({
          where: {
            tenantId: user.tenantId,
            id: { in: collaboratorIds },
          },
          select: {
            id: true,
            name: true,
            branch: { select: { id: true, name: true } },
          },
        })
      : [];

    const byId = new Map(collaborators.map((item) => [item.id, item]));

    return result.map((item) => ({
      collaboratorId: item.collaboratorId,
      collaboratorName: byId.get(item.collaboratorId)?.name ?? 'N/A',
      branchId: byId.get(item.collaboratorId)?.branch?.id ?? null,
      branchName: byId.get(item.collaboratorId)?.branch?.name ?? null,
      serviceName: item.serviceName,
      quantity: Number(item._sum.quantity ?? 0),
      amount: Number(item._sum.amount ?? 0),
      tickets: item._count._all,
    }));
  }

  async getProductivityIndividualDetailed(
    user: RequestUser,
    params: { from?: Date; to?: Date; branchId?: string; collaboratorId?: string },
  ) {
    const entries = await this.getServiceEntries(user, params);
    return entries.map((entry) => ({
      id: entry.id,
      date: entry.happenedAt,
      collaboratorId: entry.collaboratorId,
      collaboratorName: entry.collaborator.name,
      branchId: entry.branchId,
      branchName: entry.branch.name,
      clientId: entry.clientId,
      clientName: entry.clientName,
      serviceName: entry.serviceName,
      quantity: Number(entry.quantity),
      amount: Number(entry.amount),
      durationMinutes: entry.durationMinutes,
      notes: entry.notes,
    }));
  }

  async getInternalConsumptionConcentrated(
    user: RequestUser,
    params: { from?: Date; to?: Date; branchId?: string },
  ) {
    const movements = await this.prisma.salonInventoryMovement.findMany({
      where: {
        tenantId: user.tenantId,
        type: SalonInventoryMovementType.CONSUMPTION,
        ...(params.branchId ? { branchId: params.branchId } : {}),
        ...(params.from || params.to
          ? {
              createdAt: {
                ...(params.from ? { gte: params.from } : {}),
                ...(params.to ? { lte: params.to } : {}),
              },
            }
          : {}),
      },
      include: {
        product: { select: { id: true, name: true, code: true, brand: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const grouped = new Map<
      string,
      {
        productId: string;
        code: string | null;
        productName: string;
        brand: string | null;
        quantity: number;
        movements: number;
      }
    >();

    for (const movement of movements) {
      const existing = grouped.get(movement.productId) ?? {
        productId: movement.productId,
        code: movement.product.code,
        productName: movement.product.name,
        brand: movement.product.brand,
        quantity: 0,
        movements: 0,
      };
      existing.quantity += Number(movement.quantity);
      existing.movements += 1;
      grouped.set(movement.productId, existing);
    }

    return Array.from(grouped.values()).sort((left, right) => right.quantity - left.quantity);
  }

  private async ensureBranchBelongs(branchId: string, user: RequestUser) {
    const exists = await this.prisma.salonBranch.findFirst({ where: { id: branchId, tenantId: user.tenantId } });
    if (!exists) throw new NotFoundException('Branch not found');
  }

  private async ensureCollaboratorBelongs(collaboratorId: string, user: RequestUser) {
    const exists = await this.prisma.salonCollaborator.findFirst({
      where: { id: collaboratorId, tenantId: user.tenantId },
    });
    if (!exists) throw new NotFoundException('Collaborator not found');
  }

  private async ensureSupplierBelongs(supplierId: string, user: RequestUser) {
    const exists = await this.prisma.salonSupplier.findFirst({ where: { id: supplierId, tenantId: user.tenantId } });
    if (!exists) throw new NotFoundException('Supplier not found');
  }

  private async ensureServiceCategoryBelongs(categoryId: string, user: RequestUser) {
    const exists = await this.prisma.salonServiceCategory.findFirst({
      where: { id: categoryId, tenantId: user.tenantId },
    });
    if (!exists) throw new NotFoundException('Service category not found');
  }

  private async ensureServiceBelongs(serviceId: string, user: RequestUser) {
    const exists = await this.prisma.salonService.findFirst({ where: { id: serviceId, tenantId: user.tenantId } });
    if (!exists) throw new NotFoundException('Service not found');
  }

  private async ensureProductBelongs(productId: string, user: RequestUser) {
    const exists = await this.prisma.salonProduct.findFirst({ where: { id: productId, tenantId: user.tenantId } });
    if (!exists) throw new NotFoundException('Product not found');
  }
}
