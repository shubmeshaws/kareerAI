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
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                    </span>
                    Plan & Billing
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your subscription and track your feature usage.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 md:col-span-1 rounded-3xl border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <BarChart3 className="w-24 h-24" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Current Status</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl font-black text-gray-900">{sub.tier}</span>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none py-0.5">Active</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-6">Your plan is active until March 10, 2026</p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-gray-600">Weekly Resumes</span>
                                <span className="text-gray-900">{sub.usage.resumesThisWeek} / {PLANS[sub.tier].limits.resumesPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.resumesPerWeek}</span>
                            </div>
                            <Progress value={(sub.usage.resumesThisWeek / (PLANS[sub.tier].limits.resumesPerWeek || 2)) * 100} className="h-2 bg-gray-100" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-gray-600">Cover Letters</span>
                                <span className="text-gray-900">{sub.usage.coverLettersThisWeek} / {PLANS[sub.tier].limits.coverLettersPerWeek === 9999 ? "∞" : PLANS[sub.tier].limits.coverLettersPerWeek}</span>
                            </div>
                            <Progress value={(sub.usage.coverLettersThisWeek / (PLANS[sub.tier].limits.coverLettersPerWeek || 5)) * 100} className="h-2 bg-gray-100" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 md:col-span-2 rounded-3xl border-gray-100 shadow-sm flex flex-col justify-center bg-gray-50/50">
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Powering your job search</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Unlock advanced tools like the **Auto Apply Assistant** and **Direct Recruiter Outreach** by upgrading to Premium. Most users land a job 3x faster on a paid plan.
                        </p>
                        <Button variant="link" className="text-indigo-600 font-bold p-0 h-auto">
                            Learn about our success stories <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                {Object.values(PLANS).map((plan) => (
                    <Card
                        key={plan.id}
                        className={`p-8 rounded-3xl border-gray-100 transition-all ${sub.tier === plan.id
                                ? "ring-2 ring-indigo-600 bg-white"
                                : "bg-white hover:shadow-xl hover:-translate-y-1"
                            } flex flex-col`}
                    >
                        {plan.id === "Pro" && (
                            <Badge className="bg-indigo-600 text-white w-fit mb-4 -mt-2 ml-auto">Most Popular</Badge>
                        )}
                        {plan.id === "Premium" && (
                            <Badge className="bg-purple-600 text-white w-fit mb-4 -mt-2 ml-auto">Elite</Badge>
                        )}

                        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                            <span className="text-gray-400 text-sm">/ month</span>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-indigo-600" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <Button
                            className={`w-full h-12 rounded-xl font-bold h-12 ${sub.tier === plan.id
                                    ? "bg-gray-100 text-gray-400 cursor-default"
                                    : plan.id === "Free"
                                        ? "variant-outline"
                                        : "bg-gray-900 hover:bg-indigo-600 text-white shadow-lg"
                                }`}
                            disabled={sub.tier === plan.id || !!loading}
                            onClick={() => handleUpgrade(plan.id)}
                        >
                            {loading === plan.id ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {sub.tier === plan.id ? "Current Plan" : `Upgrade to ${plan.id}`}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
