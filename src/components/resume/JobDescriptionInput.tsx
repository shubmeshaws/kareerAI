"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function JobDescriptionInput({ value, onChange, disabled }: JobDescriptionInputProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                </div>
                <Label htmlFor="job-description" className="text-base font-semibold text-gray-900">
                    Job Description
                </Label>
            </div>
            <Textarea
                id="job-description"
                placeholder="Paste the job description here...

Example:
We are looking for a Senior Software Engineer with 5+ years of experience in React, TypeScript, and Node.js. The ideal candidate should have experience with AWS, Docker, and CI/CD pipelines..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
                Paste the complete job description to get the most accurate keyword matching
            </p>
        </Card>
    );
}
