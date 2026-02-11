"use client";

import { AlertCircle, Download, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

export function ExtensionInstaller() {
    return (
        <div className="space-y-6">
            <div className="bg-white/40 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-10 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] pointer-events-none" />

                <div className="flex-1 space-y-5 text-center md:text-left relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20 shadow-sm">
                        <Zap className="w-3 h-3" />
                        Browser Bridge Required
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-none tracking-tight uppercase">
                        Connect the <br /> <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">Auto-Apply</span> Assistant
                    </h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
                        The assistant needs a bridge to talk to job boards. Install our lightweight companion to enable one-click applications.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                        <Button className="bg-gray-900 dark:bg-white/10 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                            <Download className="w-4 h-4 mr-2" />
                            Download Extension
                        </Button>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            View Guide
                        </Button>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center relative">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity" />
                        <div className="w-56 h-56 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-gray-100 dark:border-white/10 flex items-center justify-center relative backdrop-blur-xl animate-pulse">
                            <ShieldCheck className="w-24 h-24 text-indigo-600 dark:text-indigo-400 shadow-indigo-500/50" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                    </div>
                </div>
            </div>

            <Alert variant="destructive" className="bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-500/10 rounded-2xl backdrop-blur-sm p-6 border transition-all">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <AlertTitle className="text-red-900 dark:text-red-400 font-black uppercase tracking-widest text-xs mb-1">Extension Not Detected</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-400/80 font-medium text-xs leading-relaxed">
                    The Auto-Apply assistant is currently offline. Please install the extension to continue your automated mission.
                </AlertDescription>
            </Alert>
        </div>
    );
}
