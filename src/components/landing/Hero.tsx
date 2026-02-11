"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
            <div className="max-w-7xl mx-auto relative">
                <div className="text-center relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-sm font-black text-cyan-400 uppercase tracking-widest">v4.0 Neural Engine Live</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]"
                    >
                        Architect Your <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                            Digital Destiny
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        The elite AI-driven career operating system for global innovators.
                        Optimize your trajectory with military-grade precision.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/signup">
                            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-12 h-16 rounded-full shadow-2xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3 text-lg">
                                    Start Your Ascent <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                                />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="ghost" className="text-white hover:text-cyan-400 px-10 h-16 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 font-bold text-lg">
                                View Capabilities
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
