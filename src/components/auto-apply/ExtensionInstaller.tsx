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
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Zap className="w-3 h-3" />
                        Browser Bridge Required
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        Connect the Auto-Apply <br /> Browser Extension
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        The assistant needs a bridge to talk to job boards. Install our lightweight companion to enable one-click applications.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                        <Button className="bg-gray-900 hover:bg-indigo-600 h-12 px-8 rounded-xl font-bold gap-2">
                            <Download className="w-4 h-4" />
                            Download Extension
                        </Button>
                        <Button variant="outline" className="h-12 px-8 rounded-xl font-bold">
                            View Guide
                        </Button>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                        <div className="w-48 h-48 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center animate-pulse">
                            <ShieldCheck className="w-20 h-20 text-indigo-600" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            <Alert variant="destructive" className="bg-red-50 border-red-100 rounded-2xl">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-900 font-bold">Extension Not Detected</AlertTitle>
                <AlertDescription className="text-red-700">
                    The Auto-Apply assistant is currently offline. Please install the extension to continue.
                </AlertDescription>
            </Alert>
        </div>
    );
}
