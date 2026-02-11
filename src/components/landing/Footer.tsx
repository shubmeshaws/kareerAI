import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "API", href: "#" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press", href: "#" },
    ],
    Resources: [
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Guides", href: "#" },
    ],
    Legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-[#080B12] border-t border-white/5 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-20">
                    {/* Logo & Description */}
                    <div className="col-span-2 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-8 group transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-lg">K</span>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Kareer<span className="text-cyan-400">AI</span>
                            </span>
                        </Link>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-sm">
                            Harnessing the pinnacle of artificial intelligence to architect elite career trajectories for global innovators.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">{category}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-500 hover:text-cyan-400 transition-colors font-medium border-b border-transparent hover:border-cyan-500/30 pb-0.5"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sm text-gray-600 font-bold tracking-tight">
                        © {new Date().getFullYear()} Kareer<span className="text-cyan-500/50">AI</span> SYSTEMS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-10">
                        {/* Social Links */}
                        {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="text-sm font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest"
                            >
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
