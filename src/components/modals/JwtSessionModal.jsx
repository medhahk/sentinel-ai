import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { decodeJwtToken } from '../../services/jwtAuthService';
import { Key, X, Copy, Check, ShieldCheck, Lock } from 'lucide-react';

export const JwtSessionModal = ({ isOpen, onClose }) => {
  const { jwtToken, userEmail, userRole, userPlan } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const decoded = decodeJwtToken(jwtToken) || {
    sub: userEmail,
    role: userRole,
    plan: userPlan,
    exp: Math.floor(Date.now() / 1000) + 604800
  };

  const copyToken = () => {
    navigator.clipboard.writeText(jwtToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl glass-panel border border-cyan-500/40 shadow-2xl rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Key className="w-5 h-5" />
            <h3 className="font-bold text-slate-100 text-sm">Active JWT Authentication Session</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHENTICATED & VALID SIGNATURE</span>
          </div>
          <span className="text-slate-400">Algorithm: HS256</span>
        </div>

        {/* Raw Encoded Token */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>RAW JWT BEARER TOKEN</span>
            <button
              onClick={copyToken}
              className="text-cyan-400 hover:underline flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Token!' : 'Copy Token'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300 break-all overflow-x-auto">
            {jwtToken}
          </pre>
        </div>

        {/* Decoded Claims Payload */}
        <div>
          <span className="block text-xs font-mono text-slate-400 mb-1">DECODED PAYLOAD CLAIMS</span>
          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
            {JSON.stringify(decoded, null, 2)}
          </pre>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs">
            Close Session Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
