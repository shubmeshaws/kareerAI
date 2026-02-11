"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MoreVertical, FileText, ExternalLink } from "lucide-react";
import { Application } from "@/lib/application-service";
import { Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ApplicationCardProps {
    application: Application;
    index: number;
    onEdit: (app: Application) => void;
    onDelete: (id: string) => void;
}

export function ApplicationCard({ application, index, onEdit, onDelete }: ApplicationCardProps) {
    return (
        <Draggable draggableId={application.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 mb-3 bg-white/40 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing group rounded-2xl relative overflow-hidden backdrop-blur-sm ${snapshot.isDragging ? "shadow-[0_0_20px_rgba(6,182,212,0.3)] border-cyan-400 rotate-2 scale-105" : "shadow-sm"
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate max-w-[150px] tracking-tight">
                                {application.role}
                            </h4>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white dark:bg-[#0E121B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white backdrop-blur-xl">
                                    <DropdownMenuItem className="focus:bg-gray-100 dark:focus:bg-white/5 focus:text-cyan-600 dark:focus:text-cyan-400 p-2 cursor-pointer" onClick={() => onEdit(application)}>
                                        Modify Record
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500 dark:text-red-400 focus:bg-red-500/10 focus:text-red-500 dark:focus:text-red-400 p-2 cursor-pointer" onClick={() => onDelete(application.id)}>
                                        Purge Entry
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 font-bold group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                            <Building2 className="w-3.5 h-3.5 text-cyan-500/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                            <span className="truncate">{application.companyName}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {application.matchScore && (
                                <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                                    {application.matchScore}% Match
                                </Badge>
                            )}
                            {application.companyType && (
                                <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                    {application.companyType}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                                {new Date(application.lastUpdated).toLocaleDateString()}
                            </div>
                            {application.resumeVersion && (
                                <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400/80 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                                    <FileText className="w-3 h-3" />
                                    v1.0.4
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </Draggable>
    );
}
