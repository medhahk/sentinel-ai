import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Lock, CheckCircle2, ShieldCheck, Smartphone, X, Sparkles, ArrowRight } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, targetPlan = 'PRO' }) => {
  const { upgradeUserPlan, addToast } = useApp();
  const [step, setStep] = useState('CARD_DETAILS'); // CARD_DETAILS | THREE_D_SECURE | SUCCESS
  const [cardName, setCardName] = useState('Alex Mercer');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('888');
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const price = targetPlan === 'ENTERPRISE' ? 199 : 49;

  const handleInitiatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('THREE_D_SECURE');
      addToast('3D Secure Payment Authentication Code sent to your phone!', 'info');
    }, 1200);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradeUserPlan(targetPlan, price);
      setStep('SUCCESS');
      addToast(`Payment Authenticated! Plan upgraded to ${targetPlan}!`, 'success');
    }, 1500);
  };

  const handleFinish = () => {
    setStep('CARD_DETAILS');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg glass-panel border border-cyan-500/40 shadow-2xl rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">3D Secure Payment Authentication</h3>
              <p className="text-[11px] text-slate-400">Upgrade to SentinelAI {targetPlan} Tier (${price}/mo)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'CARD_DETAILS' && (
          <form onSubmit={handleInitiatePayment} className="space-y-4">
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/40 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-200">{targetPlan} Subscription Plan</p>
                <p className="text-[11px] text-slate-400">Includes RAG AI Copilot, PDF Reports, Unlimited Scans</p>
              </div>
              <span className="text-xl font-extrabold font-mono text-cyan-400">${price}<span className="text-[10px] text-slate-400">/mo</span></span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">CARDHOLDER NAME</label>
              <input
                type="text"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">CREDIT / DEBIT CARD NUMBER</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">EXPIRATION (MM/YY)</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">SECURITY CVC</label>
                <input
                  type="password"
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  required
                  maxLength={4}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Connecting 3D Secure Gateway...' : `Proceed to 3D Secure Verification ($${price})`}</span>
            </button>
          </form>
        )}

        {step === 'THREE_D_SECURE' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-center space-y-2">
              <Smartphone className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
              <h4 className="font-bold text-slate-100 text-xs">3D Secure Payment Authentication Step</h4>
              <p className="text-[11px] text-slate-300">
                A 6-digit authentication code was sent to your registered phone (Ending in 88).
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded bg-slate-900 font-mono text-[10px] text-cyan-400 border border-slate-700">
                Test OTP Code: <strong className="text-slate-100">123456</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 text-center">ENTER 6-DIGIT OTP AUTHENTICATION CODE</label>
              <input
                type="text"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                placeholder="123456"
                required
                maxLength={6}
                className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl py-3 text-center text-lg font-mono text-cyan-300 tracking-widest focus:outline-none"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isProcessing ? 'Authenticating Payment...' : 'Verify OTP & Complete Checkout'}</span>
            </button>
          </form>
        )}

        {step === 'SUCCESS' && (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-extrabold text-slate-100">Payment Authenticated & Approved!</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your subscription has been upgraded to <strong>{targetPlan} Plan</strong>. JWT bearer claims updated.
            </p>
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg"
            >
              Return to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
