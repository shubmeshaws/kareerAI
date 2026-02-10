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
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </span>
                        Auto Apply Assistant
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Automate boring job application forms on Lever and Greenhouse.
                    </p>
                </div>

                <Button variant="outline" className="gap-2 font-bold">
                    <Settings className="w-4 h-4" />
                    Mapping Settings
                </Button>
            </div>

            <ExtensionInstaller />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                            <UserCircle className="w-5 h-5 text-indigo-600" />
                            Source Profile
                        </h3>

                        {profile && (
                            <div className="space-y-4">
                                <div className="pb-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Full Name</p>
                                    <p className="font-medium text-gray-900 text-sm">{profile.fullName}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</p>
                                    <p className="font-medium text-gray-900 text-sm">{profile.email}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</p>
                                    <p className="font-medium text-gray-900 text-sm">{profile.location}</p>
                                </div>
                                <div className="pb-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">LinkedIn URL</p>
                                    <p className="font-medium text-indigo-600 text-sm truncate">{profile.linkedinUrl}</p>
                                </div>
                                <Button variant="secondary" className="w-full text-xs font-bold py-5 bg-gray-50 hover:bg-gray-100">
                                    Edit Auto-Fill Profile
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <History className="w-5 h-5 text-purple-600" />
                                Application Log
                            </h3>
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                                Last 50 attempts
                            </Badge>
                        </div>

                        <div className="overflow-x-auto">
                            {logs.length > 0 ? (
                                <Table>
                                    <TableHeader className="bg-gray-50/50">
                                        <TableRow className="hover:bg-transparent border-gray-100">
                                            <TableHead className="text-[10px] uppercase font-bold text-gray-400 h-10 px-6">Source</TableHead>
                                            <TableHead className="text-[10px] uppercase font-bold text-gray-400 h-10">Platform</TableHead>
                                            <TableHead className="text-[10px] uppercase font-bold text-gray-400 h-10">Status</TableHead>
                                            <TableHead className="text-[10px] uppercase font-bold text-gray-400 h-10">Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-900">{log.companyName}</span>
                                                        <span className="text-xs text-gray-500">{log.role}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <Badge variant="outline" className="text-[10px] font-medium border-gray-200">
                                                        {log.platform}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {log.status === "Success" ? (
                                                        <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            Success
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold">
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            Error
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 text-xs text-gray-400 flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(log.timestamp).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="p-12 text-center space-y-3">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                                        <History className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 text-sm">No automated applications yet. Start by finding a job!</p>
                                    <Button variant="link" className="text-indigo-600 font-bold p-0">
                                        Go to Job Finder <ExternalLink className="w-3 h-3 ml-1" />
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
