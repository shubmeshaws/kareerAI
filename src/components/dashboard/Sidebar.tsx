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
            className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">K</span>
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            KareerAI
                        </span>
                    )}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
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
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-indigo-600" : ""}`} />
                            {!collapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Usage Meter */}
            {!collapsed && sub && (
                <div className="p-4 mx-4 mb-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {sub.tier} Plan
                        </span>
                        <span className="text-[10px] font-bold text-indigo-600">
                            {sub.usage.resumesThisWeek}/{PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek === 9999 ? "∞" : PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-500"
                            style={{
                                width: `${Math.min(100, (sub.usage.resumesThisWeek / (PLANS[sub.tier as keyof typeof PLANS].limits.resumesPerWeek || 1)) * 100)}%`
                            }}
                        />
                    </div>
                    {sub.tier !== "Premium" && (
                        <Link href="/dashboard/billing">
                            <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-indigo-600 mt-2 hover:no-underline">
                                {sub.tier === "Free" ? "Upgrade for unlimited" : "Go Premium for Auto-Apply"} <ArrowRight className="w-2 h-2 ml-1" />
                            </Button>
                        </Link>
                    )}
                </div>
            )}

            <Separator />

            {/* Logout */}
            <div className="p-4">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${collapsed ? "px-3" : ""
                            }`}
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span>Log out</span>}
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
