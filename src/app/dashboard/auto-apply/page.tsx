"use client";

import { useEffect, useState } from "react";
import { ExtensionInstaller } from "@/components/auto-apply/ExtensionInstaller";
import {
    getApplicationLogs,
    ApplicationLog,
    getProfileForAutoFill
} from "@/lib/auto-apply-service";
import {
    Zap,
    History,
    UserCircle,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AutoApplyPage() {
    const [logs, setLogs] = useState<ApplicationLog[]>([]);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        setLogs(getApplicationLogs());
        setProfile(getProfileForAutoFill());
    }, []);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 uppercase">
                        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.2)] dark:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                            <Zap className="w-6 h-6 text-white" />
                        </span>
                        Auto Apply Assistant
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Automate boring job application forms on Lever and Greenhouse.
                    </p>
                </div>

                <Button variant="outline" className="gap-3 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-600 dark:text-gray-300">
                    <Settings className="w-4 h-4" />
                    Mapping Settings
                </Button>
            </div>

            <ExtensionInstaller />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2rem] backdrop-blur-md shadow-sm dark:shadow-none overflow-hidden transition-all duration-500">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3 mb-6 uppercase tracking-tight">
                            <UserCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            Source Profile
                        </h3>

                        {profile && (
                            <div className="space-y-4">
                                <div className="pb-4 border-b border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 tracking-widest mb-1">Full Name</p>
                                    <p className="font-bold text-gray-900 dark:text-gray-200 text-sm tracking-tight">{profile.fullName}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 tracking-widest mb-1">Email Address</p>
                                    <p className="font-bold text-gray-900 dark:text-gray-200 text-sm tracking-tight">{profile.email}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 tracking-widest mb-1">Location</p>
                                    <p className="font-bold text-gray-900 dark:text-gray-200 text-sm tracking-tight">{profile.location}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 tracking-widest mb-1">LinkedIn URL</p>
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm truncate tracking-tight">{profile.linkedinUrl}</p>
                                </div>
                                <Button className="w-full h-12 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all">
                                    Edit Auto-Fill Profile
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2rem] backdrop-blur-md shadow-sm dark:shadow-none overflow-hidden transition-all duration-500">
                        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
                                <History className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                Application Log
                            </h3>
                            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 text-[10px] font-black px-3 py-1 uppercase tracking-wider">
                                Last 50 attempts
                            </Badge>
                        </div>

                        <div className="overflow-x-auto">
                            {logs.length > 0 ? (
                                <Table>
                                    <TableHeader className="bg-gray-50/50 dark:bg-white/[0.02]">
                                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-white/5">
                                            <TableHead className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 h-10 px-6 tracking-widest">Source</TableHead>
                                            <TableHead className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 h-10 tracking-widest">Platform</TableHead>
                                            <TableHead className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 h-10 tracking-widest">Status</TableHead>
                                            <TableHead className="text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 h-10 tracking-widest">Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id} className="border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                                <TableCell className="py-5 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-900 dark:text-gray-100 tracking-tight">{log.companyName}</span>
                                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-0.5">{log.role}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-5 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                    <Badge variant="outline" className="text-[10px] font-black border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 uppercase tracking-widest px-2 py-0.5">
                                                        {log.platform}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    {log.status === "Success" ? (
                                                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            Success
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider">
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            Error
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(log.timestamp).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="p-16 text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-gray-100 dark:border-white/10">
                                        <History className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <p className="text-gray-900 dark:text-gray-300 font-bold tracking-tight">No automated applications yet</p>
                                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Deploy the assistant to start tracking your mission logs here.</p>
                                    </div>
                                    <Button variant="link" className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-[10px] group">
                                        Go to Job Finder <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
