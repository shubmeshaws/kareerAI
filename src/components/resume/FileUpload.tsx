"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onClear: () => void;
    isLoading?: boolean;
}

export function FileUpload({ onFileSelect, selectedFile, onClear, isLoading }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith(".pdf") || file.name.endsWith(".docx"))) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    if (selectedFile) {
        return (
            <Card className="p-6 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-[2rem] backdrop-blur-md border shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] group transition-all duration-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <FileText className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 dark:text-white uppercase tracking-tight line-clamp-1">{selectedFile.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                </span>
                                <div className="w-1 h-1 rounded-full bg-cyan-500" />
                                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Encrypted
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClear}
                        disabled={isLoading}
                        className="h-10 w-10 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-all rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card
            className={`relative border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden rounded-[2.5rem] group ${isDragging
                ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/5 shadow-md dark:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                : "border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/2 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-white/5 shadow-sm dark:shadow-none"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <label className="flex flex-col items-center justify-center p-12 cursor-pointer relative z-10">
                <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-8 h-8 text-cyan-600 dark:text-cyan-400 group-hover:animate-bounce" />
                </div>
                <p className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
                    Deploy Repository
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-6 font-bold uppercase tracking-widest">
                    Drag and drop or click to initialize
                </p>

                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                        <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                        <span className="text-[8px] font-black uppercase text-gray-400 dark:text-gray-400 tracking-tighter">PDF CORE</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                        <span className="text-[8px] font-black uppercase text-gray-400 dark:text-gray-400 tracking-tighter">DOCX MODULE</span>
                    </div>
                </div>

                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
        </Card>
    );
}
