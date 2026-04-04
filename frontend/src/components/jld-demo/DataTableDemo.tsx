import type { ReactNode } from 'react';

export function DataTableDemo({
  headers,
  rows,
  headerGradient,
}: {
  headers: string[];
  rows: ReactNode[];
  headerGradient: string;
}) {
  const gridColumns = `repeat(${headers.length}, minmax(0, 1fr))`;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80">
      <div className="overflow-x-auto">
        <div
          className={`grid min-w-[720px] px-4 py-3 text-sm font-medium text-zinc-600 ${headerGradient}`}
          style={{ gridTemplateColumns: gridColumns }}
        >
          {headers.map((header) => (
            <div key={header}>{header}</div>
          ))}
        </div>
        <div className="min-w-[720px] divide-y divide-zinc-100 bg-white/70">{rows}</div>
      </div>
    </div>
  );
}
