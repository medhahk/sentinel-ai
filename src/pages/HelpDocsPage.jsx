import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, BookOpen, FileCode, Command, ChevronDown } from 'lucide-react';

export const HelpDocsPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Which XML/JSON scan formats does SentinelAI support natively?',
      a: 'SentinelAI supports Nmap XML output (`-oX`), Nessus `.nessus` v2 XML export files, Burp Suite Pro DAST XML reports, Nikto JSON/XML, and Nuclei JSON output.'
    },
    {
      q: 'How does the AI Security Assistant (RAG Engine) work?',
      a: 'The RAG Engine indexes your parsed XML scan findings, CVSS vectors, and asset metadata into an in-memory ChromaDB vector store. When you ask questions, it retrieves context from your active scans and synthesizes actionable fixes.'
    },
    {
      q: 'Can I export PenTest reports directly to client PDF/HTML?',
      a: 'Yes! Navigate to Report Generator, customize the branding and scope, and click "Print / Save PDF" or "Export HTML" to generate client-ready reports.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE BASE & DOCUMENTATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Help & Upload Specifications</h1>
          <p className="text-xs text-slate-400 mt-1">Scanner format guides, developer tutorials, and keyboard shortcuts.</p>
        </div>
      </div>

      {/* Keyboard Shortcuts Card */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Command className="w-4 h-4 text-cyan-400" />
          <span>Global Keyboard Shortcuts</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Command Palette</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">Ctrl + K</kbd>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">AI Assistant</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">Ctrl + /</kbd>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Upload Scan</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">Ctrl + U</kbd>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full px-4 py-3 text-left font-bold text-xs text-slate-200 flex items-center justify-between focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
