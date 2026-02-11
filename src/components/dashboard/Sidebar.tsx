"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Briefcase,
    Zap,
    CreditCard,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    LogOut
} from "lucide-react";
import { PLANS } from "@/lib/subscription-service";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/jobs", icon: Briefcase, label: "Job Finder" },
    { href: "/dashboard/applications", icon: LayoutDashboard, label: "Tracker" },
    { href: "/dashboard/auto-apply", icon: Zap, label: "Auto Apply" },
    { href: "/dashboard/resumes", icon: FileText, label: "Resumes" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Plan & Billing" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [sub, setSub] = useState<any>(null);

    useEffect(() => {
        const checkSub = () => {
            const { getSubscription } = require("@/lib/subscription-service");
            setSub(getSubscription());
        };
        checkSub();
        window.addEventListener('storage', checkSub);
        return () => window.removeEventListener('storage', checkSub);
    }, []);

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-white/5">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <span className="text-white font-bold text-sm">K</span>
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            KareerAI
                        </span>
                    )}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 text-gray-500 hover:text-cyan-500 dark:hover:text-white transition-colors"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${isActive
                                ? "bg-cyan-500/10 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-cyan-500 dark:hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-cyan-500 dark:text-cyan-400" : "group-hover:text-cyan-500 dark:group-hover:text-cyan-400"}`} />
                            {!collapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Usage Meter */}
            {!collapsed && sub && (
                <div className="p-4 mx-4 mb-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {sub.tier} Plan
                        </span>
                        <span className="text-[10px] font-bold text-cyan-500 dark:text-cyan-400">
                            {sub.usage.resumesThisWeek}/{PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek === 9999 ? "∞" : PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-1000 ease-out"
                            style={{
                                width: `${Math.min(100, (sub.usage.resumesThisWeek / (PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek || 1)) * 100)}%`
                            }}
                        />
                    </div>
                    {sub.tier !== "Premium" && (
                        <Link href="/dashboard/billing">
                            <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-cyan-600 dark:text-cyan-400 mt-2 hover:no-underline hover:text-cyan-500 dark:hover:text-cyan-300">
                                {sub.tier === "Free" ? "Upgrade for unlimited" : "Go Premium for Auto-Apply"} <ArrowRight className="w-2 h-2 ml-1" />
                            </Button>
                        </Link>
                    )}
                </div>
            )}

            <div className="px-4">
                <Separator className="bg-gray-100 dark:bg-white/5" />
            </div>

            {/* Logout */}
            <div className="p-4">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all ${collapsed ? "px-3" : ""
                            }`}
                    >
                        <LogOut className="w-5 h-5 group-hover:text-red-500" />
                        {!collapsed && <span>Log out</span>}
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
