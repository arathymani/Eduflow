import React, { useState } from 'react';
import { SubscriptionPlan, ScholarshipTier } from '../../types';
import { SUBSCRIPTION_PLANS, SCHOLARSHIP_TIERS } from '../../mock/initialData';
import { triggerCelebration } from '../common/ConfettiTrigger';
import { Percent, Award, Check, Sparkles, HeartHandshake, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface Step13Props {
  currentScore: number;
  onComplete: () => void;
}

export const Step13SubscriptionScholarship: React.FC<Step13Props> = ({ currentScore: initialScore, onComplete }) => {
  // Allow user to interactively adjust the score slider to see live price changes!
  const [simulatedScore, setSimulatedScore] = useState<number>(initialScore || 62);
  const [isAnnual, setIsAnnual] = useState(false);

  // Calculate scholarship tier from simulated score
  const activeTier: ScholarshipTier =
    SCHOLARSHIP_TIERS.find(t => simulatedScore >= t.minScore && simulatedScore <= t.maxScore) ||
    SCHOLARSHIP_TIERS[SCHOLARSHIP_TIERS.length - 1];

  const discountPercent = activeTier.discountPercentage;

  const handleScoreChange = (score: number) => {
    setSimulatedScore(score);
    if (score >= 90 && discountPercent < 30) {
      triggerCelebration();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
            <Percent className="w-3.5 h-3.5" />
            <span>Dynamic Performance Scholarship Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Performance-Based <span className="gradient-gold">Scholarship Plans</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            A revolutionary model where your academic commitment unlocks tangible tuition savings. The harder you work, the more affordable your learning becomes!
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Dynamic Eligibility: Never locked to day 1; recomputed continuously!</span>
        </div>
      </div>

      {/* Ethical Promise: Inclusive Equity Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3 text-xs sm:text-sm">
        <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white font-semibold">Our Inclusive Education Commitment:</strong>
          <p className="text-slate-300">
            Performance discounts are structured as <strong>merit scholarships</strong>, not penalties. Students starting with lower initial scores receive welcoming support discounts (min 5%) and full access to foundational bridge modules—with instant discount upgrades as their scores climb!
          </p>
        </div>
      </div>

      {/* Interactive Scholarship Calculator Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-brand-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive Simulator</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Test How Score Improvements Lower Pricing</h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-slate-400">Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                isAnnual ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-bold text-amber-300">
              Annual <span className="text-[10px] text-emerald-400">(2 Months Free)</span>
            </span>
          </div>
        </div>

        {/* Live Slider */}
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-300 font-semibold">Simulate Performance Mastery Score:</span>
            <span className="font-mono text-lg font-black text-white px-3 py-0.5 rounded-lg bg-slate-800 border border-slate-700">
              {simulatedScore}%
            </span>
          </div>

          <input
            type="range"
            min="45"
            max="100"
            step="1"
            value={simulatedScore}
            onChange={(e) => handleScoreChange(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2"
          />

          {/* Performance Band Thresholds */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] sm:text-xs text-center font-medium">
            <div className={`p-2 rounded-xl border transition ${simulatedScore < 60 ? 'bg-slate-800 border-amber-400 text-white' : 'text-slate-500 border-slate-800'}`}>
              <span>Below 60%</span>
              <strong className="block text-amber-400">5% Discount</strong>
            </div>
            <div className={`p-2 rounded-xl border transition ${simulatedScore >= 60 && simulatedScore < 75 ? 'bg-slate-800 border-amber-400 text-white' : 'text-slate-500 border-slate-800'}`}>
              <span>60% – 74%</span>
              <strong className="block text-amber-400">10% Discount</strong>
            </div>
            <div className={`p-2 rounded-xl border transition ${simulatedScore >= 75 && simulatedScore < 90 ? 'bg-slate-800 border-amber-400 text-white' : 'text-slate-500 border-slate-800'}`}>
              <span>75% – 89%</span>
              <strong className="block text-amber-400">20% Discount</strong>
            </div>
            <div className={`p-2 rounded-xl border transition ${simulatedScore >= 90 ? 'bg-slate-800 border-amber-400 text-white' : 'text-slate-500 border-slate-800'}`}>
              <span>90% – 100%</span>
              <strong className="block text-amber-400">30% Scholarship</strong>
            </div>
          </div>
        </div>

        {/* Active Scholarship Badge notification */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-orange-500/10 border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg">
              🎖️
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{activeTier.label}</span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">{activeTier.message}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xl sm:text-2xl font-black text-amber-400">-{discountPercent}% OFF</span>
          </div>
        </div>
      </div>

      {/* Available Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBSCRIPTION_PLANS.map((plan: SubscriptionPlan) => {
          const isFree = plan.basePriceMonthly === 0;
          const discountedMonthly = isFree ? 0 : Math.round(plan.basePriceMonthly * (1 - discountPercent / 100));
          const effectivePrice = isAnnual ? discountedMonthly * 10 : discountedMonthly;
          const originalPrice = isAnnual ? plan.basePriceMonthly * 12 : plan.basePriceMonthly;

          return (
            <div
              key={plan.id}
              className={`p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-6 border transition-all ${
                plan.isPopular
                  ? 'glass-panel-glow border-amber-500/50 ring-2 ring-amber-500/30 scale-[1.02]'
                  : 'glass-panel border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-white">{plan.name}</h3>
                  {plan.isPopular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div>
                  {isFree ? (
                    <div className="text-3xl font-black text-white">₹0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">₹{discountedMonthly.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 line-through">₹{plan.basePriceMonthly}</span>
                        <span className="text-xs text-slate-400">/ mo</span>
                      </div>
                      {isAnnual && (
                        <p className="text-[11px] text-emerald-400 font-semibold">
                          Billed annually at ₹{effectivePrice.toLocaleString()} (Saved ₹{(originalPrice - effectivePrice).toLocaleString()})
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onComplete}
                className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 text-white shadow-lg shadow-amber-500/30 hover:scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isFree ? 'Current Plan' : 'Claim With Scholarship'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-amber-900/60 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Step 14: Continuous Learning Feedback Loop</h4>
          <p className="text-xs text-slate-300">See what happens when a student studies for 1 month: scores rise from 62% to 78%, unlocking higher scholarship discounts!</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Simulate Continuous Learning Evolution</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
