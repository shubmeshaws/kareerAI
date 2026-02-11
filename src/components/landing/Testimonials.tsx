"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Software Engineer @ Google",
        content: "KareerAI transformed my resume from a standard list of skills into a high-impact narrative. The interview prep was scarily accurate.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        name: "David Chen",
        role: "Product Manager @ Meta",
        content: "The skill analysis identified gaps I didn't even know I had. Within 3 months of using the platform, I landed my dream role.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
        name: "Elena Rodriguez",
        role: "UX Designer @ Airbnb",
        content: "The glassmorphism UI is beautiful, but the intelligence behind it is what truly matters. It's like having a career coach in your pocket.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
];

export function Testimonials() {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
                        Voices of the <span className="text-cyan-400">Next-Gen</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        Hear from the professionals who have already ascended to their peak potential.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-8 h-full bg-white/[0.03] border-white/10 hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-sm group flex flex-col justify-between">
                                <div>
                                    <Quote className="w-10 h-10 text-cyan-500/20 mb-6 group-hover:text-cyan-500/40 transition-colors" />
                                    <p className="text-gray-300 font-medium leading-relaxed mb-8 italic">
                                        "{testimonial.content}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-cyan-500/20" />
                                    <div>
                                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                                        <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
