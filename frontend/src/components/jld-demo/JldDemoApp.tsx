'use client';

import { useState } from 'react';
import { DashboardScreen } from './DashboardScreen';
import { CustomersScreen } from './CustomersScreen';
import { LoginScreen } from './LoginScreen';
import { ProductScreen } from './ProductScreen';
import { ProductivityScreen } from './ProductivityScreen';
import { Sidebar } from './Sidebar';
import { TopSwitcher } from './TopSwitcher';
import type { BranchName, DemoScreen } from '@/data/jld-demo-data';

export function JldDemoApp() {
  const [branch, setBranch] = useState<BranchName>('Santa Fe');
  const [period, setPeriod] = useState<'Hoy' | 'Semana' | 'Mes actual'>('Mes actual');
  const [activeModule, setActiveModule] = useState('dashboard');
  const [screen, setScreen] = useState<DemoScreen>('Dashboard');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.18),_transparent_35%),linear-gradient(180deg,_#fff7fb_0%,_#f6f8ff_42%,_#f8fbff_100%)] text-zinc-900">
      <TopSwitcher screen={screen} setScreen={setScreen} />

      {screen === 'Login' ? <LoginScreen onEnter={() => setScreen('Dashboard')} /> : null}

      {screen !== 'Login' ? (
        <div className="flex min-h-[calc(100vh-73px)]">
          <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
          {screen === 'Dashboard' ? (
            <DashboardScreen
              branch={branch}
              setBranch={setBranch}
              period={period}
              setPeriod={setPeriod}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
            />
          ) : null}
          {screen === 'Clientes' ? <CustomersScreen /> : null}
          {screen === 'Producto' ? <ProductScreen /> : null}
          {screen === 'Productividad' ? <ProductivityScreen /> : null}
        </div>
      ) : null}
    </div>
  );
}
