import type { ComponentType } from 'react';
import { Scissors, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { demoModules } from '@/data/jld-demo-data';

function SidebarButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-3 text-left transition-all ${
        active ? 'bg-white text-zinc-950 shadow-[0_10px_25px_-12px_rgba(236,72,153,0.6)]' : 'text-white/80 hover:bg-white/12 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}

export function Sidebar({
  activeModule,
  onModuleChange,
}: {
  activeModule: string;
  onModuleChange: (module: string) => void;
}) {
  return (
    <aside className="hidden w-[300px] flex-col bg-[linear-gradient(180deg,#111827_0%,#1f1147_50%,#4a1248_100%)] px-5 py-5 lg:flex">
      <div className="mb-6 rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white shadow-lg">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">Jean Louis David</p>
            <p className="text-lg font-semibold text-white">Sistema Central</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/80">
          Identidad JLD conservada con una experiencia mas elegante y premium.
        </div>
        <div className="mt-4 rounded-2xl bg-black/20 p-3">
          <Image src="/logo-bco.webp" alt="Logo JLD" width={220} height={56} className="h-9 w-auto object-contain" />
        </div>
      </div>

      <div className="space-y-2">
        {demoModules.map((module) => (
          <SidebarButton
            key={module.key}
            label={module.label}
            icon={module.icon}
            active={activeModule === module.key}
            onClick={() => onModuleChange(module.key)}
          />
        ))}
      </div>

      <div className="mt-auto rounded-[30px] border border-white/10 bg-white/10 p-5 text-white/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <div>
            <p className="text-sm font-medium text-white">Acceso por roles</p>
            <p className="text-xs text-white/60">Central, sucursal, gerencia, recepcion y compras.</p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 px-3 py-2 text-sm font-semibold text-white hover:opacity-90">
          Ver propuesta tecnica
        </button>
      </div>
    </aside>
  );
}
