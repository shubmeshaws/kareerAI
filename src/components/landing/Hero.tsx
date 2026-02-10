import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Career Advancement
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                        Land Your Dream Job with{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            AI Intelligence
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        KareerAI uses advanced AI to optimize your resume, prepare you for interviews,
                        and match you with the perfect opportunities. Your career success starts here.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/signup">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl shadow-indigo-500/25 group"
                            >
                                Start Free Trial
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-6 text-lg border-gray-300 hover:border-gray-400"
                            >
                                Watch Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <p className="text-sm text-gray-500">Trusted by professionals at</p>
                        <div className="flex items-center justify-center gap-8 opacity-60">
                            {["Google", "Microsoft", "Meta", "Amazon", "Apple"].map((company) => (
                                <span key={company} className="text-lg font-semibold text-gray-400">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
