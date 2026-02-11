"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-xl group">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyan-400" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0E121B] dark:bg-[#0E121B] light:bg-white border-white/10 dark:border-white/10 light:border-gray-200 text-white dark:text-white light:text-gray-900 backdrop-blur-xl">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2 p-3 focus:bg-white/5 dark:focus:bg-white/5 light:focus:bg-gray-100 cursor-pointer"
                >
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Frost Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2 p-3 focus:bg-white/5 dark:focus:bg-white/5 light:focus:bg-gray-100 cursor-pointer"
                >
                    <Moon className="h-4 w-4 text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2 p-3 focus:bg-white/5 dark:focus:bg-white/5 light:focus:bg-gray-100 cursor-pointer"
                >
                    <Monitor className="h-4 w-4 text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">System Sync</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
