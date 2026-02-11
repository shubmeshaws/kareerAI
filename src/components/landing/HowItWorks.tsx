"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Create Your Profile",
        description: "Sign up and let our AI analyze your experience, skills, and career goals to build a comprehensive profile.",
    },
    {
        number: "02",
        title: "Optimize Your Resume",
        description: "Our AI crafts tailored resumes for each application, ensuring you pass ATS filters and catch recruiters' attention.",
    },
    {
        number: "03",
        title: "Prepare & Practice",
        description: "Use AI-powered mock interviews to practice answering questions specific to your target role and company.",
    },
    {
        number: "04",
        title: "Land Your Dream Job",
        description: "Apply with confidence, track your applications, and receive personalized guidance until you get hired.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-24"
                >
                    <h2 className="text-4xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
                        The Science of <span className="text-cyan-400">Velocity</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        A systematic approach to career dominance, powered by advanced heuristics.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative group"
                            >
                                <div className="text-center lg:text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 mx-auto lg:mx-0 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-500 relative z-10">
                                        <span className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{step.number}</span>
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="flex justify-center my-8 lg:hidden">
                                        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
