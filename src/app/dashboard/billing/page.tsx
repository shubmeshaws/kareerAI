"use client";

import { useState, useEffect } from "react";
import { PLANS, PlanTier, getSubscription, upgradePlan, SubscriptionStatus } from "@/lib/subscription-service";
import { createCheckoutSession } from "@/lib/stripe";
import {
    CreditCard,
    Check,
    Zap,
    ShieldCheck,
    Crown,
    Loader2,
    ArrowRight,
    Sparkles,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
    const [sub, setSub] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState<string | null>(null);

    useEffect(() => {
        setSub(getSubscription());
    }, []);

    const handleUpgrade = async (tier: PlanTier) => {
        setLoading(tier);
        // Simulate Stripe checkout
        await createCheckoutSession(tier);
        upgradePlan(tier);
        setSub(getSubscription());
        setLoading(null);
    };

    if (!sub) return null;

    return (
        <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden p-3 gap-3">
            {/* Header - Compact */}
            <header className="flex items-center justify-between shrink-0 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Subscription Protocol</h1>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Manage Neural Capacity</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 grid grid-rows-[auto_1fr] gap-3 overflow-hidden">
                {/* Top Section: Active Status & Promo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-0 shrink-0">
                    {/* Active Status Card */}
                    <div className="bg-white dark:bg-black/20 rounded-[1.5rem] p-5 border border-gray-100 dark:border-white/5 relative overflow-hidden flex flex-col justify-between shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <BarChart3 className="w-24 h-24 text-indigo-600 dark:text-indigo-400" />
                        </div>

                        <div>
                            <h3 className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Current Tier</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{sub.tier}</span>
                                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none py-0.5 px-2 text-[9px] font-black uppercase tracking-wider rounded-md shadow-md">Active</Badge>
                            </div>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-1">Renews: March 10, 2026</p>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400 dark:text-gray-500">Weekly Resumes</span>
                                    <span className="text-gray-900 dark:text-white">{sub.usage.resumesThisWeek} / {PLANS[sub.tier].limits.resumesPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.resumesPerWeek}</span>
                                </div>
                                <Progress value={(sub.usage.resumesThisWeek / (PLANS[sub.tier].limits.resumesPerWeek || 2)) * 100} className="h-1.5 bg-gray-100 dark:bg-white/5 disabled" indicatorClassName="bg-gradient-to-r from-cyan-500 to-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400 dark:text-gray-500">Cover Letters</span>
                                    <span className="text-gray-900 dark:text-white">{sub.usage.coverLettersThisWeek} / {PLANS[sub.tier].limits.coverLettersPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.coverLettersPerWeek}</span>
                                </div>
                                <Progress value={(sub.usage.coverLettersThisWeek / (PLANS[sub.tier].limits.coverLettersPerWeek || 5)) * 100} className="h-1.5 bg-gray-100 dark:bg-white/5 disabled" indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500" />
                            </div>
                        </div>
                    </div>

                    {/* Promo Card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[1.5rem] p-6 relative overflow-hidden flex flex-col justify-center text-white shadow-lg shadow-indigo-500/10">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                                <Sparkles className="w-8 h-8 text-yellow-300" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black tracking-tight uppercase mb-2">Unlock Neural Superiority</h3>
                                <p className="text-xs text-white/80 leading-relaxed font-medium max-w-lg">
                                    Upgrade to <strong>Premium</strong> for the **Auto Apply Assistant** and **Direct Recruiter Outreach**. AI-driven optimization helps you land a job 3x faster.
                                </p>
                            </div>
                            <Button variant="secondary" className="shrink-0 bg-white text-indigo-900 hover:bg-indigo-50 font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl shadow-xl border-none">
                                View Success Stories <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Plans Grid */}
                <div className="bg-gray-50/50 dark:bg-black/20 rounded-[1.5rem] p-4 border border-gray-100 dark:border-white/5 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        {Object.values(PLANS).map((plan) => (
                            <div
                                key={plan.id}
                                className={`p-6 rounded-[2rem] border transition-all duration-300 relative flex flex-col h-full group ${sub.tier === plan.id
                                    ? "bg-white dark:bg-white/10 border-indigo-500/50 shadow-lg dark:shadow-[0_0_20px_rgba(99,102,241,0.1)] ring-1 ring-indigo-500/20"
                                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:border-indigo-500/30 hover:bg-gray-50 dark:hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-widest uppercase">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mt-1">
                                            <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                                            <span className="text-gray-400 dark:text-gray-500 text-[9px] font-black uppercase tracking-widest">/ mo</span>
                                        </div>
                                    </div>
                                    {plan.id === "Pro" && (
                                        <Badge className="bg-indigo-600 text-white border-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md shadow-lg">Popular</Badge>
                                    )}
                                    {plan.id === "Premium" && (
                                        <Badge className="bg-purple-600 text-white border-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md shadow-lg">Elite</Badge>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-[10px] text-gray-600 dark:text-gray-300 font-bold leading-tight">
                                            <div className="w-4 h-4 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className={`w-full h-10 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] transition-all ${sub.tier === plan.id
                                        ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-default hover:bg-gray-100 dark:hover:bg-white/5"
                                        : plan.id === "Free"
                                            ? "bg-transparent border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                            : "bg-gray-900 dark:bg-white/10 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md"
                                        }`}
                                    disabled={sub.tier === plan.id || !!loading}
                                    onClick={() => handleUpgrade(plan.id)}
                                >
                                    {loading === plan.id ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
                                    {sub.tier === plan.id ? "CURRENT PLAN" : `UPGRADE TO ${plan.id}`}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
