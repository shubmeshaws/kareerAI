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
    Target,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

const adminNavItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
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

    return (
        <aside className={`fixed left-0 top-0 h-full w-16 lg:w-52 bg-[#F2F2F2] border-r border-gray-200 flex flex-col transition-all duration-300 z-50`}>
            {/* Logo */}
            <div className="px-5 mb-10 mt-6 flex justify-center lg:justify-start shrink-0">
                <Link href="/admin">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-lg hover:rotate-6 transition-transform">A</div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3 overflow-y-auto custom-scrollbar">
                {adminNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${pathname === item.href
                            ? "bg-white text-black shadow-md shadow-gray-200/50"
                            : "text-gray-400 hover:bg-white hover:text-black hover:shadow-sm"
                            }`}
                    >
                        <item.icon className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" strokeWidth={1.5} />
                        <span className="hidden lg:block font-semibold text-xs truncate">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Theme Toggle & User Profile */}
            <div className="px-3 mb-6 mt-auto pt-4 shrink-0 space-y-4">
                <div className="flex justify-center lg:justify-start px-2">
                    <ThemeToggle />
                </div>

                <div className={`flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group`}>
                    <Avatar className="h-8 w-8 rounded-lg border-2 border-slate-50">
                        <AvatarImage src="/avatars/admin.png" />
                        <AvatarFallback className="bg-black text-white text-[10px] font-black">AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block overflow-hidden">
                        <p className="text-[10px] font-black text-slate-900 leading-none truncate uppercase tracking-tighter">Admin User</p>
                        <p className="text-[8px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Console</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
