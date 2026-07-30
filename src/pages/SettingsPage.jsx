import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Key, Bot, Bell, Sliders, Save } from 'lucide-react';

export const SettingsPage = () => {
  const { userName, userEmail, userRole, addToast } = useApp();
  const [apiKey, setApiKey] = useState('sn_live_9981248192a84b1');
  const [llmProvider, setLlmProvider] = useState('OpenAI GPT-4o (RAG Enabled)');
  const [llmKey, setLlmKey] = useState('sk-proj-••••••••••••••••');
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Platform settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <Settings className="w-4 h-4" />
            <span>PLATFORM CONFIGURATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Settings & Integrations</h1>
          <p className="text-xs text-slate-400 mt-1">Manage user credentials, LLM provider API keys, and Slack webhooks.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-cyan-400" />
            <span>User Profile Credentials</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">FULL NAME</label>
              <input
                type="text"
                defaultValue={userName}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">WORK EMAIL</label>
              <input
                type="email"
                defaultValue={userEmail}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* LLM & AI Engine Config */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI Copilot & LLM Engine Provider</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">LLM MODEL PROVIDER</label>
              <select
                value={llmProvider}
                onChange={e => setLlmProvider(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="OpenAI GPT-4o (RAG Enabled)">OpenAI GPT-4o (RAG Enabled)</option>
                <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
                <option value="Local Ollama (Llama-3-Sec)">Local Ollama (Llama-3 Cybersecurity)</option>
                <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">API ACCESS KEY</label>
              <input
                type="password"
                value={llmKey}
                onChange={e => setLlmKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* API Tokens */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Sentinel Platform API Tokens</span>
          </h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">BEARER TOKEN (CI/CD SCAN UPLOADS)</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={apiKey}
                readOnly
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono"
              />
              <button
                type="button"
                onClick={() => addToast('Regenerated API Token!', 'info')}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>

        {/* Webhooks */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification & Alert Webhooks</span>
          </h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">SLACK / TEAMS INCOMING WEBHOOK</label>
            <input
              type="text"
              value={slackWebhook}
              onChange={e => setSlackWebhook(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
