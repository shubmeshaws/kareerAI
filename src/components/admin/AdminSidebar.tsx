"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Activity,
    FileText,
    Briefcase,
    Key,
    BarChart3,
    Terminal,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    ExternalLink,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const adminNavItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/resumes", icon: FileText, label: "Resumes" },
    { href: "/admin/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/admin/activities", icon: Activity, label: "Activities" },
    { href: "/admin/automatch", icon: Target, label: "Auto Match" },
    { href: "/admin/ai-keys", icon: Key, label: "AI Keys" },
    { href: "/admin/ai-usage", icon: BarChart3, label: "AI Usage" },
    { href: "/admin/system-logs", icon: Terminal, label: "System Logs" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">A</span>
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white leading-none">Admin</span>
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">KareerAI</span>
                        </div>
                    )}
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {adminNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                ? "bg-indigo-600 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : ""}`} />
                            {!collapsed && (
                                <span className="font-medium text-sm">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <Separator className="bg-slate-800" />

            {/* User Switcher Entry */}
            <div className="p-4">
                <Link href="/dashboard">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800 ${collapsed ? "px-3" : ""
                            }`}
                    >
                        <ExternalLink className="w-5 h-5" />
                        {!collapsed && <span>User Dashboard</span>}
                    </Button>
                </Link>
            </div>

            {/* Logout */}
            <div className="p-4">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 ${collapsed ? "px-3" : ""
                            }`}
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span>Exit Admin</span>}
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
