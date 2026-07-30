import React from 'react';

export const SeverityDonut = ({ critical = 3, high = 5, medium = 6, low = 8 }) => {
  const total = critical + high + medium + low;
  const cPct = (critical / total) * 100;
  const hPct = (high / total) * 100;
  const mPct = (medium / total) * 100;
  const lPct = (low / total) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* SVG Donut */}
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3.8"
          />

          {/* Low */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3.8"
            strokeDasharray={`${lPct}, 100`}
            strokeDashoffset="0"
          />

          {/* Medium */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eab308"
            strokeWidth="3.8"
            strokeDasharray={`${mPct}, 100`}
            strokeDashoffset={`-${lPct}`}
          />

          {/* High */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f97316"
            strokeWidth="3.8"
            strokeDasharray={`${hPct}, 100`}
            strokeDashoffset={`-${lPct + mPct}`}
          />

          {/* Critical */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.8"
            strokeDasharray={`${cPct}, 100`}
            strokeDashoffset={`-${lPct + mPct + hPct}`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold font-mono text-slate-100">{total}</span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Findings</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs font-mono">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="text-slate-300">Critical ({critical})</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="text-slate-300">High ({high})</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span className="text-slate-300">Medium ({medium})</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span className="text-slate-300">Low ({low})</span>
        </div>
      </div>
    </div>
  );
};
