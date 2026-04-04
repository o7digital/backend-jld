import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function KpiCard({
  title,
  value,
  delta,
  positive,
  icon: Icon,
  glow,
  soft,
}: {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: LucideIcon;
  glow: string;
  soft: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="relative overflow-hidden rounded-[30px] border border-white/75 bg-white/85 shadow-[0_18px_45px_-24px_rgba(168,85,247,0.35)] backdrop-blur-xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${soft}`} />
        <div className="relative flex items-start justify-between gap-4 p-6">
          <div>
            <p className="text-sm font-medium text-zinc-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{value}</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 ${
                  positive ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {delta}
              </span>
              <span className="text-zinc-500">vs mes anterior</span>
            </div>
          </div>
          <div className={`rounded-[22px] bg-gradient-to-br ${glow} p-3.5 text-white shadow-xl`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
