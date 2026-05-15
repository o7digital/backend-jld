import { PrismaClient, SalonInventoryMovementType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as XLSX from 'xlsx';
const prisma = new PrismaClient();
const FILES = {
  collaborators: '/Users/oliviersteineur/Downloads/cat_colaboradores (1).xlsx',
  services: '/Users/oliviersteineur/Downloads/cat_servicios (2).xlsx',
  products: '/Users/oliviersteineur/Downloads/cat_productos (3).xlsx',
};
const FUTURE_SALES_FILES = {
  productivityIndividualConcentrated: '/Users/oliviersteineur/Downloads/productividad_individual_concentrada (2).xlsx',
};
const DEMO = { tenantName: 'Demo Cliente JLD', email: 'demo.cliente@jld.local', password: 'DemoJLD2026!', name: 'Cliente Demo' };
const readRows = (path: string) => XLSX.utils.sheet_to_json(XLSX.readFile(path).Sheets[XLSX.readFile(path).SheetNames[0]], { header: 1, defval: null, raw: false }) as (string | null)[][];
const parseNumber = (v: unknown): number | null => {
  if (v == null) return null;
  const n = Number(String(v).trim().replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : null;
};
const branchFromTitleCell = (c: string | null) => (c?.match(/Sucursal:\s*(.+)$/i)?.[1]?.trim() || 'JEAN LOUIS DAVID SANTA FE');
async function main() {
  // Catalog import only. Sales/productivity imports need a dedicated module with
  // idempotency keys, date parsing, client matching and duplicate protection.
  void FUTURE_SALES_FILES;

  const rowsCol = readRows(FILES.collaborators), rowsSrv = readRows(FILES.services), rowsPrd = readRows(FILES.products);
  const branchPolanco = branchFromTitleCell(rowsCol[1]?.[0]), branchSantaFe = branchFromTitleCell(rowsSrv[1]?.[0]);
  let user = await prisma.user.findUnique({ where: { email: DEMO.email } }); let tenantId: string;
  if (!user) { const tenant = await prisma.tenant.create({ data: { name: DEMO.tenantName } }); tenantId = tenant.id; user = await prisma.user.create({ data: { email: DEMO.email, name: DEMO.name, role: UserRole.OWNER, tenantId, password: await bcrypt.hash(DEMO.password, 10) } }); } else { tenantId = user.tenantId; }
  const santaFe = await prisma.salonBranch.upsert({ where: { tenantId_name: { tenantId, name: branchSantaFe } }, update: { isActive: true }, create: { tenantId, name: branchSantaFe } });
  const polanco = await prisma.salonBranch.upsert({ where: { tenantId_name: { tenantId, name: branchPolanco } }, update: { isActive: true }, create: { tenantId, name: branchPolanco } });
  await prisma.salonInventoryMovement.deleteMany({ where: { tenantId, reason: 'Carga demo inicial desde catálogo' } });
  for (const row of rowsCol.slice(4)) { const name = String(row[2] ?? '').trim(); if (!name) continue; const code = parseNumber(row[0]); await prisma.salonCollaborator.upsert({ where: { tenantId_branchId_name: { tenantId, branchId: polanco.id, name } }, update: { code: code ? Math.round(code) : null, isActive: true }, create: { tenantId, branchId: polanco.id, name, code: code ? Math.round(code) : null } }); }
  const categoryMap = new Map<string, string>(); let pos = 1;
  for (const row of rowsSrv.slice(4)) { const division = String(row[1] ?? '').trim(); if (!division || categoryMap.has(division)) continue; const c = await prisma.salonServiceCategory.upsert({ where: { tenantId_name: { tenantId, name: division } }, update: {}, create: { tenantId, name: division, position: pos++ } }); categoryMap.set(division, c.id); }
  for (const row of rowsSrv.slice(4)) { const name = String(row[2] ?? '').trim(); if (!name) continue; const division = String(row[1] ?? '').trim(); await prisma.salonService.upsert({ where: { tenantId_name: { tenantId, name } }, update: { key: String(row[0] ?? '').trim() || null, categoryId: categoryMap.get(division) ?? null, price1: parseNumber(row[3]), price2: parseNumber(row[4]), price3: parseNumber(row[5]), cost: parseNumber(row[6]) }, create: { tenantId, key: String(row[0] ?? '').trim() || null, categoryId: categoryMap.get(division) ?? null, name, price1: parseNumber(row[3]), price2: parseNumber(row[4]), price3: parseNumber(row[5]), cost: parseNumber(row[6]) } }); }
  const supplier = await prisma.salonSupplier.upsert({ where: { tenantId_name: { tenantId, name: 'PROVEEDOR DEMO' } }, update: {}, create: { tenantId, name: 'PROVEEDOR DEMO' } });
  for (const row of rowsPrd.slice(4)) { const name = String(row[3] ?? '').trim(); if (!name) continue; const stock = parseNumber(row[11]); const p = await prisma.salonProduct.upsert({ where: { tenantId_name: { tenantId, name } }, update: { code: String(row[0] ?? '').trim() || null, brand: String(row[1] ?? '').trim() || null, line: String(row[2] ?? '').trim() || null, branchId: santaFe.id, supplierId: supplier.id, price1: parseNumber(row[4]), price2: parseNumber(row[5]), price3: parseNumber(row[6]), collaboratorPrice: parseNumber(row[7]), cost: parseNumber(row[8]), stock }, create: { tenantId, code: String(row[0] ?? '').trim() || null, brand: String(row[1] ?? '').trim() || null, line: String(row[2] ?? '').trim() || null, name, branchId: santaFe.id, supplierId: supplier.id, price1: parseNumber(row[4]), price2: parseNumber(row[5]), price3: parseNumber(row[6]), collaboratorPrice: parseNumber(row[7]), cost: parseNumber(row[8]), stock } }); if ((stock ?? 0) > 0) await prisma.salonInventoryMovement.create({ data: { tenantId, branchId: santaFe.id, productId: p.id, type: SalonInventoryMovementType.PURCHASE, quantity: stock!, reason: 'Carga demo inicial desde catálogo', createdById: user.id } }); }
  console.log(`Demo prêt sur tenant ${tenantId}`); console.log(`User: ${DEMO.email}`); console.log(`Password: ${DEMO.password}`);
}
main().finally(async () => prisma.$disconnect());
