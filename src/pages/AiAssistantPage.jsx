import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, User, Database, RefreshCw, Copy, Check, Terminal } from 'lucide-react';

export const AiAssistantPage = () => {
  const { aiChat, sendAiMessage, assets, vulnerabilities, scans } = useApp();
  const [inputText, setInputText] = useState('');
  const [selectedContext, setSelectedContext] = useState('ALL_SCANS');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAiMessage(inputText);
    setInputText('');
  };

  const presetQuestions = [
    'Explain CVE-2024-21887 (SQL Injection) and business risk',
    'Why is SQL Injection dangerous for backend APIs?',
    'How do I fix XSS vulnerabilities in React & Node?',
    'Generate executive summary for latest Nmap scan',
    'Prioritize open vulnerabilities by business criticality'
  ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-100 flex items-center space-x-2">
              <span>SentinelAI Copilot</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                RAG NEURAL CORE
              </span>
            </h1>
            <p className="text-xs text-slate-400">Contextual VAPT AI assistant trained on scan findings & NIST CVE feeds</p>
          </div>
        </div>

        {/* RAG Context Selector */}
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <select
            value={selectedContext}
            onChange={e => setSelectedContext(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL_SCANS">RAG Context: All Scans ({scans.length})</option>
            <option value="CRITICAL_ONLY">Context: Critical Findings ({vulnerabilities.filter(v => v.severity==='Critical').length})</option>
            <option value="GLOBAL_KB">Global Security Knowledge Base</option>
          </select>
        </div>
      </div>

      {/* Preset Quick Prompts Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase">SUGGESTED PROMPTS:</span>
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => sendAiMessage(q)}
            className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Window */}
      <div className="flex-1 glass-panel rounded-2xl p-5 overflow-y-auto space-y-4">
        {aiChat.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-mono'
                  : 'bg-slate-900 border border-cyan-500/40 text-cyan-400 shadow-md'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                  : 'glass-panel border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-1">
                <span>{msg.sender === 'user' ? 'Security Analyst' : 'SentinelAI RAG Bot'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <div className="whitespace-pre-wrap font-sans text-xs">{msg.text}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="glass-panel p-2 rounded-2xl flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask SentinelAI to explain CVEs, generate executive summary, or write remediation scripts..."
          className="flex-1 bg-transparent px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
