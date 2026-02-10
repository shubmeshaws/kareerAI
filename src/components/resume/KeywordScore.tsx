"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { KeywordAnalysis, getScoreColor, getScoreLabel } from "@/lib/keyword-extractor";

interface KeywordScoreProps {
    analysis: KeywordAnalysis;
}

export function KeywordScore({ analysis }: KeywordScoreProps) {
    const { score, matchedKeywords, missingKeywords } = analysis;
    const scoreColor = getScoreColor(score);
    const scoreLabel = getScoreLabel(score);

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Keyword Match Score</h3>
            </div>

            {/* Score Display */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`text-5xl font-bold ${scoreColor}`}>
                    {score}%
                </div>
                <div>
                    <p className={`font-medium ${scoreColor}`}>{scoreLabel}</p>
                    <p className="text-sm text-gray-500">
                        {matchedKeywords.length} of {matchedKeywords.length + missingKeywords.length} keywords matched
                    </p>
                </div>
            </div>

            <Progress value={score} className="h-3 mb-6" />

            {/* Matched Keywords */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-gray-700">
                        Matched Keywords ({matchedKeywords.length})
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((kw, i) => (
                        <Badge
                            key={i}
                            variant="secondary"
                            className="bg-green-100 text-green-700 hover:bg-green-200"
                        >
                            {kw.keyword}
                        </Badge>
                    ))}
                    {matchedKeywords.length === 0 && (
                        <p className="text-sm text-gray-500">No keywords matched yet</p>
                    )}
                </div>
            </div>

            {/* Missing Keywords */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <p className="text-sm font-medium text-gray-700">
                        Missing Keywords ({missingKeywords.length})
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((kw, i) => (
                        <Badge
                            key={i}
                            variant="secondary"
                            className="bg-red-100 text-red-600 hover:bg-red-200"
                        >
                            {kw.keyword}
                        </Badge>
                    ))}
                    {missingKeywords.length === 0 && (
                        <p className="text-sm text-green-600">All keywords matched! 🎉</p>
                    )}
                </div>
            </div>
        </Card>
    );
}
