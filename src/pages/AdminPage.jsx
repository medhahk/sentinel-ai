import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users, Activity, Lock, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export const AdminPage = () => {
  const { auditLogs, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('users');

  const usersList = [
    { id: 1, name: 'Alex Mercer', email: 'alex.mercer@sentinel.ai', role: 'Security Lead', status: 'Active', lastLogin: '2 mins ago' },
    { id: 2, name: 'Sarah Connor', email: 'sarah.connor@sentinel.ai', role: 'PenTester', status: 'Active', lastLogin: '1 hour ago' },
    { id: 3, name: 'Marcus Vance', email: 'marcus.vance@sentinel.ai', role: 'SOC Analyst', status: 'Active', lastLogin: 'Yesterday' },
    { id: 4, name: 'Elena Rostova', email: 'elena.rostova@sentinel.ai', role: 'Auditor', status: 'Inactive', lastLogin: '3 days ago' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ADMINISTRATIVE CONSOLE & AUDIT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">User Management & System Telemetry</h1>
          <p className="text-xs text-slate-400 mt-1">RBAC permissions matrix, user lifecycle, and audit logs.</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            SYSTEM HEALTH: 100%
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 transition-colors ${activeTab === 'users' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          User Accounts & Roles
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 transition-colors ${activeTab === 'audit' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          System Audit Logs
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`pb-3 transition-colors ${activeTab === 'telemetry' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Infrastructure Telemetry
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 text-sm">Active User Accounts</h3>
            <button
              onClick={() => addToast('Invited new team member!', 'success')}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono"
            >
              + Invite User
            </button>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">User Name</th>
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Last Active</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 font-bold text-slate-100 flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>{u.name}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">{u.email}</td>
                  <td className="py-3 px-3 font-mono text-cyan-400">{u.role}</td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{u.lastLogin}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${u.status === 'Active' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-cyan-400 hover:underline font-mono text-[11px]">Edit Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm pb-2 border-b border-slate-800">Security Audit Trail</h3>
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Resource Target</th>
                <th className="py-2.5 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">{log.user}</td>
                  <td className="py-3 px-3 font-semibold text-slate-200">{log.action}</td>
                  <td className="py-3 px-3 text-slate-400">{log.resource}</td>
                  <td className="py-3 px-3 text-slate-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Infrastructure Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl glass-panel text-center">
            <span className="block text-2xl font-extrabold font-mono text-cyan-400">12%</span>
            <span className="text-xs text-slate-400">CPU Load</span>
          </div>
          <div className="p-4 rounded-xl glass-panel text-center">
            <span className="block text-2xl font-extrabold font-mono text-purple-400">1.4 GB</span>
            <span className="text-xs text-slate-400">Memory Usage</span>
          </div>
          <div className="p-4 rounded-xl glass-panel text-center">
            <span className="block text-2xl font-extrabold font-mono text-emerald-400">Online</span>
            <span className="text-xs text-slate-400">PostgreSQL Vector Database</span>
          </div>
          <div className="p-4 rounded-xl glass-panel text-center">
            <span className="block text-2xl font-extrabold font-mono text-blue-400">Active</span>
            <span className="text-xs text-slate-400">XML Parser Workers</span>
          </div>
        </div>
      )}
    </div>
  );
};
