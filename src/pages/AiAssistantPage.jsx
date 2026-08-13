import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, User, Database, Download, Trash2, Code2, Terminal, CheckCircle2 } from 'lucide-react';

export const AiAssistantPage = () => {
  const { aiChat, setAiChat, sendAiMessage, vulnerabilities, scans, addToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [selectedContext, setSelectedContext] = useState('ALL_SCANS');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsTyping(true);
    sendAiMessage(inputText);
    setInputText('');
    setTimeout(() => setIsTyping(false), 1200);
  };

  const handleQuickPrompt = (promptText) => {
    setIsTyping(true);
    sendAiMessage(promptText);
    setTimeout(() => setIsTyping(false), 1200);
  };

  const handleClearChat = () => {
    setAiChat([
      {
        id: 1,
        sender: 'assistant',
        text: 'Chat history cleared. SentinelAI RAG Copilot is ready for your security queries.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    addToast('Chat history cleared', 'info');
  };

  const handleDownloadTranscript = () => {
    const transcript = aiChat.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([transcript], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentinel_ai_transcript_${Date.now()}.md`;
    a.click();
    addToast('Downloaded chat transcript markdown file!', 'success');
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-4 animate-fadeIn">
      {/* Top Bar */}
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

        <div className="flex items-center space-x-2">
          {/* RAG Context Selector */}
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedContext}
              onChange={e => setSelectedContext(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="ALL_SCANS">Context: All Active Scans ({scans.length})</option>
              <option value="CRITICAL_ONLY">Context: Critical Findings ({vulnerabilities.filter(v => v.severity==='Critical').length})</option>
              <option value="GLOBAL_KB">Context: Global Security Knowledge Base</option>
            </select>
          </div>

          <button
            onClick={handleDownloadTranscript}
            title="Download Transcript"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300"
          >
            <Download className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={handleClearChat}
            title="Clear Chat"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-400 text-slate-300"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase">QUICK ACTIONS:</span>
        <button
          onClick={() => handleQuickPrompt("Explain CVE-2024-21887 (SQL Injection) and generate a Python PoC script")}
          className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 shrink-0 flex items-center space-x-1"
        >
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>Python PoC Exploit Script</span>
        </button>
        <button
          onClick={() => handleQuickPrompt("Generate an Ansible Hardening Playbook for SQL Injection remediation")}
          className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 shrink-0 flex items-center space-x-1"
        >
          <Code2 className="w-3 h-3 text-emerald-400" />
          <span>Ansible Fix Playbook</span>
        </button>
        <button
          onClick={() => handleQuickPrompt("Generate Executive Summary for latest Nmap scan")}
          className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-slate-300 shrink-0 flex items-center space-x-1"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Executive Synthesis Report</span>
        </button>
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

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono">
            <Bot className="w-4 h-4 animate-spin" />
            <span className="animate-pulse">SentinelAI RAG Neural Engine generating response...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
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
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5"
        >
          <span>Send Query</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
