"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for getting started with your job search",
        features: [
            "1 AI-optimized resume",
            "5 mock interview sessions/month",
            "Basic job matching",
            "Email support",
        ],
        cta: "Get Started Free",
        popular: false,
    },
    {
        name: "Professional",
        price: "$19",
        period: "/month",
        description: "For serious job seekers ready to level up",
        features: [
            "Unlimited AI resumes",
            "Unlimited mock interviews",
            "Advanced job matching",
            "Cover letter generation",
            "Application tracking",
            "Priority support",
        ],
        cta: "Start 7-Day Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$49",
        period: "/month",
        description: "For teams and career coaches",
        features: [
            "Everything in Professional",
            "Team collaboration",
            "Custom branding",
            "API access",
            "Dedicated account manager",
            "Custom integrations",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
                        Tiered <span className="text-cyan-400">Intelligence</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-medium">
                        Select the computational power required for your professional ascent.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card className={`relative h-full p-10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 flex flex-col ${plan.popular
                                ? "border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-20"
                                : "border-white/10 hover:border-white/20"
                                }`}>
                                {plan.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                        Peak Efficiency
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white tracking-tighter">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                                            {plan.price === "Custom" ? "" : "/ Cycle"}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-gray-400 font-medium text-sm leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="flex-grow space-y-4 mb-10">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-4">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-cyan-500" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button className={`w-full h-16 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 ${plan.popular
                                    ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-xl shadow-cyan-500/20 hover:scale-[1.02]"
                                    : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                                    }`}>
                                    {plan.cta}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
