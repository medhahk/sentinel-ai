import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Key, Bot, Bell, CreditCard, ShieldCheck, Download, Save } from 'lucide-react';

export const SettingsPage = () => {
  const { userName, userEmail, userRole, userPlan, setIsPaymentModalOpen, invoices, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [apiKey, setApiKey] = useState('sn_live_9981248192a84b1');
  const [llmProvider, setLlmProvider] = useState('OpenAI GPT-4o (RAG Enabled)');
  const [llmKey, setLlmKey] = useState('sk-proj-••••••••••••••••');
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Platform settings updated!', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <Settings className="w-4 h-4" />
            <span>PLATFORM CONFIGURATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Settings & Billing</h1>
          <p className="text-xs text-slate-400 mt-1">User profile, JWT API keys, LLM provider, and billing subscriptions.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors ${activeTab === 'profile' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Profile & General
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 transition-colors ${activeTab === 'billing' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Billing & Payment History ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('llm')}
          className={`pb-3 transition-colors ${activeTab === 'llm' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          AI Engine & Integrations
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-3">User Profile</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">FULL NAME</label>
              <input type="text" defaultValue={userName} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">WORK EMAIL</label>
              <input type="email" defaultValue={userEmail} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Active Plan Card */}
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/40 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">CURRENT ACTIVE PLAN</span>
              <h3 className="text-xl font-extrabold text-slate-100 mt-0.5">{userPlan} Plan</h3>
              <p className="text-xs text-slate-400 mt-1">Unlimited Scans, RAG AI Assistant, and Executive PDF Reports.</p>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg flex items-center space-x-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Change Subscription</span>
            </button>
          </div>

          {/* Invoices Table */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-3">Payment History & Invoices</h3>
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Invoice ID</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Plan Details</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-3 text-cyan-400 font-bold">{inv.id}</td>
                    <td className="py-3 px-3 text-slate-400">{inv.date}</td>
                    <td className="py-3 px-3 font-semibold text-slate-200">{inv.plan}</td>
                    <td className="py-3 px-3 text-slate-200 font-bold">{inv.amount}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button onClick={() => window.print()} className="text-cyan-400 hover:underline">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'llm' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-3">AI Engine Provider</h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">LLM MODEL PROVIDER</label>
            <select
              value={llmProvider}
              onChange={e => setLlmProvider(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono"
            >
              <option value="OpenAI GPT-4o (RAG Enabled)">OpenAI GPT-4o (RAG Enabled)</option>
              <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
              <option value="Local Ollama (Llama-3-Sec)">Local Ollama (Llama-3 Cybersecurity)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
