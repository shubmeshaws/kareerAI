"use client";

import { motion } from "framer-motion";

const brands = [
    "Google", "Meta", "Amazon", "Netflix", "Airbnb",
    "Stripe", "OpenAI", "Microsoft", "Apple", "NVIDIA"
];

export function Marquee() {
    return (
        <div className="py-20 bg-white/[0.02] border-y border-white/5 overflow-hidden relative z-10">
            <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">
                    Trusted by Innovators at
                </p>
            </div>

            <div className="flex select-none overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex flex-nowrap gap-20 items-center justify-around min-w-full"
                >
                    {[...brands, ...brands].map((brand, i) => (
                        <span
                            key={i}
                            className="text-4xl md:text-5xl font-black text-white/20 hover:text-cyan-400/50 transition-colors duration-500 cursor-default"
                        >
                            {brand}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Fading Edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0E121B] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0E121B] to-transparent z-10" />
        </div>
    );
}
