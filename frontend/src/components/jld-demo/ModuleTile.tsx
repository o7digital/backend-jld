import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export function ModuleTile({
  icon: Icon,
  label,
  accent,
  surface,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  accent: string;
  surface: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[30px] border ${
        active ? 'border-fuchsia-300' : 'border-white/70'
      } bg-white/90 text-left shadow-[0_18px_50px_-24px_rgba(59,130,246,0.35)] backdrop-blur-xl transition-all`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${surface}`} />
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`} />
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <div className={`rounded-[22px] bg-gradient-to-br ${accent} p-3 text-white shadow-lg`}>
            <Icon className="h-5 w-5" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div className="mt-10">
          <p className="text-base font-semibold text-zinc-900">{label}</p>
          <p className="mt-1 text-sm text-zinc-500">Diseño premium, lectura rapida y mejor estructura.</p>
        </div>
      </div>
    </motion.button>
  );
}
