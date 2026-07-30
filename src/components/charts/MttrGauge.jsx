import React from 'react';

export const MttrGauge = ({ days = 4.2 }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3.5"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeDasharray="75, 100"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold font-mono text-emerald-400">{days}</span>
          <span className="text-[10px] text-slate-400 font-mono uppercase">DAYS MTTR</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        Average Mean Time To Remediate critical CVEs (-32% from last quarter)
      </p>
    </div>
  );
};
