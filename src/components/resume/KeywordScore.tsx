"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, TrendingUp, Target } from "lucide-react";
import { KeywordAnalysis, getScoreColor, getScoreLabel } from "@/lib/keyword-extractor";

interface KeywordScoreProps {
    analysis: KeywordAnalysis;
}

export function KeywordScore({ analysis }: KeywordScoreProps) {
    const { score, matchedKeywords, missingKeywords } = analysis;
    const scoreLabel = getScoreLabel(score);

    // Dynamic styles based on score
    const getThemeColors = (s: number) => {
        if (s >= 80) return "from-cyan-500 to-emerald-500 text-emerald-400";
        if (s >= 50) return "from-cyan-500 to-indigo-600 text-cyan-400";
        return "from-orange-500 to-red-600 text-red-400";
    };

    const themeColors = getThemeColors(score);

    return (
        <Card className="p-8 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[3rem] backdrop-blur-md relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Neural Match Score</h3>
                </div>
                <Badge variant="outline" className="border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[9px] px-3 py-1">
                    v4.2.0-STABLE
                </Badge>
            </div>

            {/* Score Display */}
            <div className="flex items-end gap-6 mb-8 relative">
                <div className={`text-7xl font-black bg-gradient-to-br ${themeColors} bg-clip-text text-transparent tracking-tighter`}>
                    {score}%
                </div>
                <div className="mb-2">
                    <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1">{scoreLabel}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-tight">
                        {matchedKeywords.length} / {matchedKeywords.length + missingKeywords.length} Vectors Matched
                    </p>
                </div>
            </div>

            <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-10 border border-gray-100 dark:border-white/5 shadow-inner">
                <div
                    className={`h-full bg-gradient-to-r ${themeColors} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.3)]`}
                    style={{ width: `${score}%` }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Matched Keywords */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">
                            Active Clusters ({matchedKeywords.length})
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {matchedKeywords.map((kw, i) => (
                            <Badge
                                key={i}
                                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-tight px-3 py-1 rounded-lg"
                            >
                                {kw.keyword}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                            <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">
                            Missing Paradigms ({missingKeywords.length})
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingKeywords.map((kw, i) => (
                            <Badge
                                key={i}
                                className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[9px] font-black uppercase tracking-tight px-3 py-1 rounded-lg"
                            >
                                {kw.keyword}
                            </Badge>
                        ))}
                        {missingKeywords.length === 0 && (
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest animate-pulse">Neural Convergence achieved 🎉</p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
