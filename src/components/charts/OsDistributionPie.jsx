import React from 'react';

export const OsDistributionPie = () => {
  const data = [
    { label: 'Ubuntu Linux', pct: 45, color: '#f97316' },
    { label: 'Red Hat Enterprise', pct: 25, color: '#ef4444' },
    { label: 'Windows Server', pct: 20, color: '#3b82f6' },
    { label: 'Cisco IOS / Network', pct: 10, color: '#06b6d4' }
  ];

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">{item.label}</span>
            <span className="text-slate-400 font-bold">{item.pct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${item.pct}%`, backgroundColor: item.color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
