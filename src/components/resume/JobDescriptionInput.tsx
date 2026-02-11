"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Briefcase, Zap } from "lucide-react";

interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function JobDescriptionInput({ value, onChange, disabled }: JobDescriptionInputProps) {
    return (
        <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/5 rounded-[2.5rem] backdrop-blur-sm group shadow-sm dark:shadow-none transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center shadow-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <Label htmlFor="job-description" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">
                        Operational Schema (JD)
                    </Label>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/5">
                    <Zap className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-[8px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Neural Link Active</span>
                </div>
            </div>

            <Textarea
                id="job-description"
                placeholder="Paste the target job description to initialize keyword extraction vectors..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="min-h-[250px] resize-none bg-gray-50/50 dark:bg-black/20 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 rounded-2xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-mono text-[11px] p-6 leading-relaxed custom-scrollbar shadow-inner"
            />

            <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-[9px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest">
                    Minimum Payload: 50 Tokens
                </p>
                <p className="text-[9px] text-gray-500 dark:text-gray-700 font-bold uppercase tracking-tighter">
                    Status: {value.length > 50 ? 'READY' : 'AWAITING DATA'}
                </p>
            </div>
        </Card>
    );
}
