import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

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
        <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Simple,{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Transparent
                        </span>{" "}
                        Pricing
                    </h2>
                    <p className="text-lg text-gray-600">
                        Choose the plan that fits your career goals. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative p-8 ${plan.popular
                                    ? "border-2 border-indigo-600 shadow-xl scale-105"
                                    : "border-gray-200"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/signup">
                                <Button
                                    className={`w-full ${plan.popular
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                                            : "bg-gray-900 hover:bg-gray-800 text-white"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
