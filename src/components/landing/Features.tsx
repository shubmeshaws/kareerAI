"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    FileText,
    MessageSquare,
    Target,
    TrendingUp,
    Brain,
    Zap,
    Sparkles
} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "AI Resume Builder",
        description: "Create ATS-optimized resumes tailored to specific job descriptions with intelligent keyword suggestions.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: MessageSquare,
        title: "Interview Prep",
        description: "Practice with AI-powered mock interviews and receive personalized feedback to boost your confidence.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Target,
        title: "Job Matching",
        description: "Get matched with opportunities that align with your skills, experience, and career aspirations.",
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: TrendingUp,
        title: "Career Insights",
        description: "Access industry trends, salary benchmarks, and growth opportunities in your field.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: Brain,
        title: "Skills Analysis",
        description: "Identify skill gaps and get personalized learning recommendations to advance your career.",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        icon: Zap,
        title: "Auto-Deploy",
        description: "Automate complex applications with zero-latency synchronization.",
        gradient: "from-cyan-400 to-blue-400",
    },
    {
        icon: TrendingUp,
        title: "Market Velocity",
        description: "Real-time metrics on salary trends and market liquidity.",
        gradient: "from-blue-500 to-indigo-500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export function Features() {
    return (
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
                        Cognitive <span className="text-cyan-400">Advantages</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        Push the boundaries of your career with intelligence-driven modules
                        engineered for the next generation of professionals.
                    </p>
                </motion.div>

                {/* Features Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className={`${feature.size || ""} group relative`}
                        >
                            <Card className="h-full p-8 bg-white/[0.03] border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.06] transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-md">
                                {/* Decorator Glow */}
                                <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

                                <div>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center text-cyan-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                    Analyze Capability <Sparkles className="ml-2 w-3 h-3" />
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
