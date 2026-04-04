import type { DemoScreen } from '@/data/jld-demo-data';
import { demoScreens } from '@/data/jld-demo-data';

export function TopSwitcher({
  screen,
  setScreen,
}: {
  screen: DemoScreen;
  setScreen: (next: DemoScreen) => void;
}) {
  return (
    <div className="border-b border-white/60 bg-white/60 px-4 py-3 backdrop-blur-xl sm:px-6 xl:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Vista mockup</p>
          <p className="text-sm font-medium text-zinc-800">Navegacion premium de pantallas JLD</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoScreens.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setScreen(item)}
              className={`rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm font-medium shadow-sm transition ${
                screen === item ? 'bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white' : 'text-zinc-700 hover:bg-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
