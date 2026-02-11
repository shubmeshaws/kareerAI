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
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 uppercase">
                        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.2)] dark:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                            <CreditCard className="w-6 h-6 text-white" />
                        </span>
                        Plan & Billing
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Manage your subscription and track your feature usage.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 md:col-span-1 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2rem] backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden group transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BarChart3 className="w-24 h-24 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Current Status</h3>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{sub.tier}</span>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none py-1 px-3 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-lg">Active</Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-8">Next billing cycle: March 10, 2026</p>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-400 dark:text-gray-500">Weekly Resumes</span>
                                <span className="text-gray-900 dark:text-white">{sub.usage.resumesThisWeek} / {PLANS[sub.tier].limits.resumesPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.resumesPerWeek}</span>
                            </div>
                            <Progress value={(sub.usage.resumesThisWeek / (PLANS[sub.tier].limits.resumesPerWeek || 2)) * 100} className="h-2 bg-gray-100 dark:bg-white/5" indicatorClassName="bg-gradient-to-r from-cyan-500 to-indigo-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-400 dark:text-gray-500">Cover Letters</span>
                                <span className="text-gray-900 dark:text-white">{sub.usage.coverLettersThisWeek} / {PLANS[sub.tier].limits.coverLettersPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.coverLettersPerWeek}</span>
                            </div>
                            <Progress value={(sub.usage.coverLettersThisWeek / (PLANS[sub.tier].limits.coverLettersPerWeek || 5)) * 100} className="h-2 bg-gray-100 dark:bg-white/5" indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500" />
                        </div>
                    </div>
                </Card>

                <Card className="p-8 md:col-span-2 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2rem] backdrop-blur-md shadow-sm dark:shadow-none flex flex-col justify-center transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
                    <div className="relative max-w-md">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase">Powering your job search</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium">
                            Unlock advanced tools like the **Auto Apply Assistant** and **Direct Recruiter Outreach** by upgrading to Premium. AI-driven optimization helps you land a job 3x faster.
                        </p>
                        <Button variant="link" className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-[10px] p-0 h-auto group">
                            Learn about our success stories <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                {Object.values(PLANS).map((plan) => (
                    <Card
                        key={plan.id}
                        className={`p-10 rounded-[3rem] border transition-all duration-500 relative flex flex-col group ${sub.tier === plan.id
                            ? "bg-white/80 dark:bg-white/10 border-indigo-500/50 shadow-2xl dark:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                            : "bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/5 backdrop-blur-md shadow-sm dark:shadow-none hover:shadow-xl hover:border-indigo-500/30 dark:hover:bg-white/10"
                            }`}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">/ month</span>
                                </div>
                            </div>
                            {plan.id === "Pro" && (
                                <Badge className="bg-indigo-600 text-white border-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rotate-3 shadow-lg">Popular</Badge>
                            )}
                            {plan.id === "Premium" && (
                                <Badge className="bg-purple-600 text-white border-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 -rotate-3 shadow-lg">Elite</Badge>
                            )}
                        </div>

                        <div className="space-y-5 mb-10 flex-1">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300 font-bold">
                                    <div className="w-5 h-5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <Button
                            className={`w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all transform hover:scale-[1.02] active:scale-95 ${sub.tier === plan.id
                                ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-default"
                                : plan.id === "Free"
                                    ? "bg-transparent border-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                    : "bg-gray-900 dark:bg-white/10 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xl"
                                }`}
                            disabled={sub.tier === plan.id || !!loading}
                            onClick={() => handleUpgrade(plan.id)}
                        >
                            {loading === plan.id ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : null}
                            {sub.tier === plan.id ? "ACTIVE" : `SELECT ${plan.id}`}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
