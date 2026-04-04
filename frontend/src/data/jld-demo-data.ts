import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Boxes,
  Briefcase,
  CalendarRange,
  ClipboardList,
  Crown,
  FileText,
  Package,
  Settings2,
  ShoppingBag,
  Store,
  Users,
  Wallet,
} from 'lucide-react';

export type DemoScreen = 'Login' | 'Dashboard' | 'Clientes' | 'Producto' | 'Productividad';

export type BranchName = 'Santa Fe' | 'Polanco' | 'Bodega';

export type ScreenModule = {
  key: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  surface: string;
};

export type DashboardKpi = {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: LucideIcon;
  glow: string;
  soft: string;
};

export const demoBranches: BranchName[] = ['Santa Fe', 'Polanco', 'Bodega'];

export const demoScreens: DemoScreen[] = ['Login', 'Dashboard', 'Clientes', 'Producto', 'Productividad'];

export const dashboardKpis: DashboardKpi[] = [
  {
    title: 'Ventas del mes',
    value: '$428,500',
    delta: '+12.4%',
    positive: true,
    icon: Wallet,
    glow: 'from-fuchsia-500 to-pink-500',
    soft: 'from-fuchsia-50 to-pink-50',
  },
  {
    title: 'Citas registradas',
    value: '1,284',
    delta: '+8.1%',
    positive: true,
    icon: CalendarRange,
    glow: 'from-cyan-500 to-sky-500',
    soft: 'from-cyan-50 to-sky-50',
  },
  {
    title: 'Ticket promedio',
    value: '$1,145',
    delta: '-2.3%',
    positive: false,
    icon: ShoppingBag,
    glow: 'from-amber-400 to-orange-500',
    soft: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Consumo interno',
    value: '$36,920',
    delta: '+4.9%',
    positive: true,
    icon: Package,
    glow: 'from-violet-500 to-indigo-500',
    soft: 'from-violet-50 to-indigo-50',
  },
];

export const demoModules: ScreenModule[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: Crown,
    accent: 'from-fuchsia-500 via-pink-500 to-rose-500',
    surface: 'from-fuchsia-50 via-white to-rose-50',
  },
  {
    key: 'ventas',
    label: 'Analisis de ventas',
    icon: BarChart3,
    accent: 'from-cyan-500 via-sky-500 to-blue-600',
    surface: 'from-cyan-50 via-white to-blue-50',
  },
  {
    key: 'clientes',
    label: 'Clientes',
    icon: Users,
    accent: 'from-amber-400 via-orange-400 to-rose-400',
    surface: 'from-amber-50 via-white to-rose-50',
  },
  {
    key: 'productividad',
    label: 'Productividad',
    icon: Briefcase,
    accent: 'from-violet-500 via-purple-500 to-fuchsia-500',
    surface: 'from-violet-50 via-white to-fuchsia-50',
  },
  {
    key: 'producto',
    label: 'Producto',
    icon: Package,
    accent: 'from-emerald-500 via-teal-500 to-cyan-500',
    surface: 'from-emerald-50 via-white to-cyan-50',
  },
  {
    key: 'catalogos',
    label: 'Catalogos',
    icon: ClipboardList,
    accent: 'from-pink-500 via-rose-500 to-orange-400',
    surface: 'from-pink-50 via-white to-orange-50',
  },
  {
    key: 'administrativo',
    label: 'Administrativo',
    icon: FileText,
    accent: 'from-indigo-500 via-violet-500 to-purple-500',
    surface: 'from-indigo-50 via-white to-purple-50',
  },
  {
    key: 'parametros',
    label: 'Parametros',
    icon: Settings2,
    accent: 'from-slate-500 via-zinc-500 to-stone-500',
    surface: 'from-slate-50 via-white to-stone-50',
  },
];

export const demoCollaborators = [
  { name: 'Juan Resendiz', branch: 'Santa Fe', services: 91, sales: '$34,560', satisfaction: 96 },
  { name: 'Madelein Colin', branch: 'Santa Fe', services: 74, sales: '$13,965', satisfaction: 93 },
  { name: 'Juana Gonzalez', branch: 'Santa Fe', services: 52, sales: '$9,065', satisfaction: 91 },
  { name: 'Andrea Nataly Arreola', branch: 'Polanco', services: 68, sales: '$18,210', satisfaction: 95 },
  { name: 'William Arias', branch: 'Polanco', services: 49, sales: '$12,940', satisfaction: 90 },
  { name: 'Marco Varela', branch: 'Bodega', services: 42, sales: '$8,220', satisfaction: 88 },
];

export const demoServices = [
  { service: 'Corte dama', category: 'Corte', price: '$1,200', branch: 'Santa Fe', margin: 76 },
  { service: 'Balayage largo', category: 'Color', price: '$3,000', branch: 'Santa Fe', margin: 71 },
  { service: 'Manicure spa', category: 'Unas', price: '$500', branch: 'Polanco', margin: 64 },
  { service: 'Tratamiento vapor', category: 'Tratamientos', price: '$800', branch: 'Santa Fe', margin: 69 },
  { service: 'Peinado mediano', category: 'Peinado', price: '$750', branch: 'Polanco', margin: 74 },
];

export const demoInventoryAlerts = [
  { name: 'CBD Instant Shampoo 1L', stock: 1, minimum: 4, supplier: 'Brazilian' },
  { name: 'Blowout Express 4 Week 1L', stock: 1, minimum: 3, supplier: 'Brazilian' },
  { name: 'Matiz 3', stock: 2, minimum: 5, supplier: 'Diacolor' },
  { name: 'Amp Collagen Genesis', stock: 3, minimum: 6, supplier: 'Belcomex' },
];

export const demoCustomers = [
  { name: 'Magda Martinez', visits: 18, spend: '$24,800', lastVisit: '28 Mar 2026', level: 'VIP' },
  { name: 'Andrea Certucha', visits: 12, spend: '$13,200', lastVisit: '25 Mar 2026', level: 'Frecuente' },
  { name: 'Sofia Levy', visits: 9, spend: '$10,600', lastVisit: '22 Mar 2026', level: 'Premium' },
  { name: 'Susana Sanchez', visits: 7, spend: '$8,450', lastVisit: '19 Mar 2026', level: 'Frecuente' },
];

export const demoProducts = [
  { name: 'CBD Instant Shampoo 1L', stock: 1, line: 'Brazilian', price: '$1,241', status: 'Bajo' },
  { name: 'Acai Ionic Bonding Spray', stock: 3, line: 'Brazilian', price: '$1,373', status: 'Normal' },
  { name: 'Matiz 3', stock: 2, line: 'Diacolor', price: '$700', status: 'Bajo' },
  { name: 'Amp Collagen Genesis', stock: 3, line: 'Belcomex', price: '$475', status: 'Normal' },
];

export const demoProductKpis = [
  { label: 'Productos en catalogo', value: '1,276', icon: Boxes, color: 'from-cyan-500 to-blue-600' },
  { label: 'Proveedores activos', value: '14', icon: Store, color: 'from-fuchsia-500 to-rose-500' },
  { label: 'Stock critico', value: '23', icon: Package, color: 'from-amber-400 to-orange-500' },
  { label: 'Compras del mes', value: '$84,300', icon: ShoppingBag, color: 'from-emerald-500 to-teal-500' },
];

export const productivityMetrics = [
  { title: 'Meta mensual', value: 84, color: 'from-cyan-500 to-blue-600' },
  { title: 'Satisfaccion', value: 94, color: 'from-amber-400 to-orange-500' },
  { title: 'Recompra', value: 67, color: 'from-violet-500 to-fuchsia-500' },
  { title: 'Upselling', value: 38, color: 'from-emerald-500 to-teal-500' },
];

export const smartCatalogCards = [
  {
    title: 'Color premium',
    subtitle: 'Mayor margen en Santa Fe',
    value: '$168,400',
    trend: '+14%',
    color: 'from-fuchsia-500 to-rose-500',
  },
  {
    title: 'Retail capilar',
    subtitle: 'Recuperacion semanal',
    value: '$76,980',
    trend: '+9%',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Combos ritual',
    subtitle: 'Ticket elevado',
    value: '$48,210',
    trend: '+6%',
    color: 'from-violet-500 to-indigo-600',
  },
];
