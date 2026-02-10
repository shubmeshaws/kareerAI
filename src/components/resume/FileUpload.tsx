"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
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
            <Card className="p-4 border-2 border-indigo-200 bg-indigo-50/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClear}
                        disabled={isLoading}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card
            className={`relative border-2 border-dashed transition-colors cursor-pointer ${isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                    Upload your resume
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Drag and drop or click to browse
                </p>
                <p className="text-xs text-gray-400">
                    Supports PDF and DOCX files
                </p>
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
