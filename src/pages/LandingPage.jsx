import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Sparkles,
  Radar,
  Lock,
  FileCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Server,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Landing Header */}
      <header className="sticky top-0 z-50 glass-header px-6 py-4 border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Sentinel<span className="text-cyan-400">AI</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-widest">
                VAPT MANAGEMENT PLATFORM
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#scanners" className="hover:text-cyan-400 transition-colors">Scanners</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('login')}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-1.5"
            >
              <span>View Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs text-cyan-300 font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI-POWERED VAPT MANAGEMENT ENGINE v2.4</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Automated Vulnerability Assessment &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              AI Security Intelligence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Consolidate Nmap, Nessus, Burp, Nikto & Nuclei scans into an interactive AI-driven cybersecurity hub.
            Automate prioritization, generate executive PenTest reports, and remediate CVE threats faster.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('register')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className="px-6 py-3 rounded-xl glass-panel glass-panel-interactive text-slate-200 font-bold text-sm flex items-center space-x-2"
            >
              <Radar className="w-4 h-4 text-cyan-400" />
              <span>Explore Dashboard Demo</span>
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>Star on GitHub</span>
            </a>
          </div>

          {/* Stat Badges */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-extrabold font-mono text-cyan-400">99.8%</span>
              <span className="text-xs text-slate-400">Parser Accuracy</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-extrabold font-mono text-emerald-400">&lt; 4.2 Days</span>
              <span className="text-xs text-slate-400">Average MTTR</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-extrabold font-mono text-blue-400">6+ Scanners</span>
              <span className="text-xs text-slate-400">Native XML/JSON Parsers</span>
            </div>
            <div className="p-4 rounded-xl glass-panel text-center">
              <span className="block text-2xl font-extrabold font-mono text-purple-400">RAG AI</span>
              <span className="text-xs text-slate-400">Security Context Assistant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100">
              Built for Modern Security Practitioners
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Engineered specifically for PenTesters, SOC Teams, Bug Bounty Hunters, and Security Consultants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Radar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Automated Multi-Scanner Ingestion</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Drag and drop raw scan reports from Nmap XML, Nessus `.nessus`, Burp Suite, Nikto, and Nuclei.
                SentinelAI automatically parses assets, open ports, and vulnerabilities into unified state.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Autonomous RAG AI Security Copilot</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Query your security posture in natural language. Ask SentinelAI to write custom PoC exploits,
                explain complex CVEs, prioritize high-risk assets, and suggest hardening rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Professional PenTest Report Generator</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generate Executive, Technical, or Compliance (PCI-DSS / ISO 27001) reports in seconds.
                Export directly to PDF, DOCX, or standalone HTML with live interactive preview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100">Simple 4-Step Workflow</h2>
            <p className="text-slate-400 text-sm mt-3">From raw scan outputs to executive remediation reports.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload Scan Reports', desc: 'Import Nmap, Nessus, or Nuclei XML/JSON files.' },
              { step: '02', title: 'AI RAG Analysis', desc: 'SentinelAI correlates findings against EPSS & CVE feeds.' },
              { step: '03', title: 'Prioritize & Fix', desc: 'Review PoCs, technical impact, and developer code patches.' },
              { step: '04', title: 'Export PDF Report', desc: 'Deliver polished pentest reports to executive stakeholders.' }
            ].map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel relative">
                <span className="text-3xl font-extrabold font-mono text-cyan-500/40 block mb-3">{s.step}</span>
                <h4 className="font-bold text-slate-200 text-base mb-2">{s.title}</h4>
                <p className="text-slate-400 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Scanners Badges */}
      <section id="scanners" className="py-16 px-6 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-8">NATIVELY SUPPORTED SCANNER ENGINES</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Nmap XML', 'Nessus Pro', 'Burp Suite Pro', 'Nikto', 'Nuclei Scanner', 'OpenVAS (Future)'].map((scanner, i) => (
              <div key={i} className="px-5 py-2.5 rounded-xl glass-panel font-mono text-xs font-semibold text-slate-300 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                {scanner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-100">Flexible Pricing Tiers</h2>
            <p className="text-slate-400 text-sm mt-3">Choose the plan suited for individual learners or security SOC teams.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-200 text-lg">Community Learner</h3>
                <p className="text-xs text-slate-400 mt-1">For students & bug bounty hunters</p>
                <div className="mt-4 text-3xl font-extrabold font-mono text-slate-100">$0 <span className="text-xs text-slate-500 font-sans">/ month</span></div>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Up to 10 Asset Systems</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Nmap & Nuclei Parsers</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Basic AI Assistant Queries</span></li>
                </ul>
              </div>
              <button onClick={() => navigateTo('register')} className="w-full mt-8 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl glass-panel border-2 border-cyan-500/60 shadow-xl shadow-cyan-500/10 flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold font-mono">POPULAR</span>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">Pro PenTester</h3>
                <p className="text-xs text-slate-400 mt-1">For security consultants & freelancers</p>
                <div className="mt-4 text-3xl font-extrabold font-mono text-cyan-400">$49 <span className="text-xs text-slate-500 font-sans">/ month</span></div>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Unlimited Assets & Scans</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>All Scanner XML/JSON Engines</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Full RAG AI Security Copilot</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Custom PDF & DOCX Report Export</span></li>
                </ul>
              </div>
              <button onClick={() => navigateTo('register')} className="w-full mt-8 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/25">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-200 text-lg">SOC Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">For corporate SOC teams & CISOs</p>
                <div className="mt-4 text-3xl font-extrabold font-mono text-slate-100">$199 <span className="text-xs text-slate-500 font-sans">/ month</span></div>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Multi-Tenant RBAC & Teams</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Custom LLM Provider Integration</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>SIEM / Jira / Slack Webhooks</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>24/7 Dedicated Security SLA</span></li>
                </ul>
              </div>
              <button onClick={() => navigateTo('register')} className="w-full mt-8 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 SentinelAI. All rights reserved. Built for security analysts and penetration testers.</p>
      </footer>
    </div>
  );
};
