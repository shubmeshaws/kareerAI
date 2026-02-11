import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0E121B] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[3rem] p-12 sm:p-24 overflow-hidden shadow-2xl shadow-cyan-500/20">
                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] -ml-20 -mb-20" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-5xl sm:text-7xl font-black text-black tracking-tighter mb-8 leading-[1.1]">
                            Ready to Claim Your <br />
                            Elite Career Trajectory?
                        </h2>
                        <p className="text-xl text-black/70 font-bold mb-12 max-w-2xl mx-auto">
                            Join thousands of global innovators who are already leveraging KareerAI
                            to automate their path to the top.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/signup">
                                <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-12 py-8 text-2xl font-black rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group">
                                    Initiate Deployment
                                    <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
