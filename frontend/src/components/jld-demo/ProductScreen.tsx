import { Download, Plus } from 'lucide-react';
import { demoProductKpis, demoProducts } from '@/data/jld-demo-data';
import { DataTableDemo } from './DataTableDemo';
import { SectionHeader } from './SectionHeader';

export function ProductScreen() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 xl:px-8">
      <div className="grid gap-4 lg:grid-cols-4">
        {demoProductKpis.map((item) => (
          <div key={item.label} className="rounded-[30px] border border-white/70 bg-white/80 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-zinc-900">{item.value}</p>
              </div>
              <div className={`rounded-[22px] bg-gradient-to-br ${item.color} p-3 text-white shadow-lg`}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(59,130,246,0.2)] backdrop-blur-xl">
        <SectionHeader
          title="Catalogo de producto"
          description="Tabla premium para gestion de stock, lineas y precios."
          action={
            <div className="flex gap-2">
              <button className="inline-flex items-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Nuevo producto
              </button>
              <button className="inline-flex items-center rounded-2xl border border-white bg-white px-4 py-2 text-sm font-medium text-zinc-700">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </button>
            </div>
          }
        />

        <div className="mt-5">
          <DataTableDemo
            headers={['Producto', 'Linea', 'Stock', 'Precio', 'Status']}
            headerGradient="bg-gradient-to-r from-cyan-50 via-white to-violet-50"
            rows={demoProducts.map((item) => (
              <div key={item.name} className="grid grid-cols-5 items-center px-4 py-4 text-sm hover:bg-cyan-50/30">
                <div className="font-medium text-zinc-900">{item.name}</div>
                <div>{item.line}</div>
                <div>{item.stock}</div>
                <div className="font-medium">{item.price}</div>
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === 'Bajo' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </div>
  );
}
