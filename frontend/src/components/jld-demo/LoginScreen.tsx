import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lock, Scissors } from 'lucide-react';

export function LoginScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.35),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.28),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(249,115,22,0.22),transparent_30%),linear-gradient(135deg,#111827_0%,#2b1454_45%,#5b123e_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-xl">
              <Scissors className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Jean Louis David</p>
              <h2 className="text-2xl font-semibold">Sistema central premium</h2>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm">Demo nueva generacion</div>
            <h1 className="text-5xl font-semibold leading-tight">Un backend que se siente premium desde el login.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/75">
              Diseno aspiracional con mejor marca, jerarquia clara y valor percibido mas alto que el SAS actual.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              {[
                { label: 'Sucursales', value: '3' },
                { label: 'Clientes activos', value: '+12k' },
                { label: 'Modulos', value: '9' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-black/20 p-3">
            <Image src="/logo-bco.webp" alt="Logo JLD" width={220} height={56} className="h-10 w-auto object-contain" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[36px] border border-white/70 bg-white/80 p-8 shadow-[0_30px_90px_-30px_rgba(236,72,153,0.35)] backdrop-blur-2xl"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 text-white shadow-xl">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Acceso seguro</p>
              <h3 className="text-2xl font-semibold text-zinc-900">Bienvenido</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Correo</label>
              <input className="h-12 w-full rounded-2xl border border-white bg-white/90 px-3 text-zinc-900" placeholder="gerencia@jld.com.mx" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Contrasena</label>
              <input
                className="h-12 w-full rounded-2xl border border-white bg-white/90 px-3 text-zinc-900"
                placeholder="••••••••••"
                type="password"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Perfil</label>
              <div className="grid grid-cols-3 gap-2">
                {['Central', 'Sucursal', 'Recepcion'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className="rounded-2xl border border-white bg-white px-3 py-3 text-sm font-medium text-zinc-700 shadow-sm hover:bg-fuchsia-50"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onEnter}
              className="mt-2 h-12 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 text-sm font-semibold text-white hover:opacity-90"
            >
              Entrar al sistema
            </button>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-sm text-zinc-700">
                Mas elegante que el sistema actual.
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4 text-sm text-zinc-700">
                Mejor primera impresion para el cliente.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
