"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    // Mock user data - In production, get from session
    const user = {
        name: "John Doe",
        email: "john@example.com",
        avatar: null,
    };

    return (
        <header className="h-16 bg-white/70 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Search */}
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                    placeholder="Deep Search..."
                    className="pl-10 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-500"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 ml-auto">
                <ThemeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative group hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                    <Bell className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </Button>

                {/* User dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 pl-2 pr-3 hover:bg-gray-100 dark:hover:bg-white/5 group transition-all">
                            <Avatar className="h-8 w-8 ring-1 ring-gray-200 dark:ring-white/10 group-hover:ring-cyan-500/50 transition-all">
                                <AvatarImage src={user.avatar || undefined} />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-600 to-indigo-600 text-white text-sm font-black">
                                    {user.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">{user.name}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{user.email}</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#0E121B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white backdrop-blur-xl">
                        <DropdownMenuLabel className="text-gray-400 text-[10px] font-black uppercase tracking-widest p-4 pb-2">COMMAND CENTER</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5" />
                        <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-white/5 focus:text-cyan-500 dark:focus:text-cyan-400 p-3 cursor-pointer">
                            <Link href="/dashboard" className="w-full font-medium">Internal Core</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-white/5 focus:text-cyan-500 dark:focus:text-cyan-400 p-3 cursor-pointer">
                            <Link href="/dashboard/settings" className="w-full font-medium">Neural Config</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/5" />
                        <DropdownMenuItem className="text-red-500 dark:text-red-400 focus:bg-red-500/10 focus:text-red-500 dark:focus:text-red-400 p-3 cursor-pointer">
                            <Link href="/" className="w-full font-medium">Terminate Session</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
