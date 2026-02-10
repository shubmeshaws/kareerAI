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
                    className={`p-4 mb-3 border-gray-100 hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${snapshot.isDragging ? "shadow-lg border-indigo-200 rotate-2" : ""
                        }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 truncate max-w-[150px]">
                            {application.role}
                        </h4>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEdit(application)}>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => onDelete(application.id)}>
                                    Delete Application
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{application.companyName}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {application.matchScore && (
                            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] px-1.5">
                                {application.matchScore}% Match
                            </Badge>
                        )}
                        {application.companyType && (
                            <Badge variant="outline" className="text-[10px] px-1.5">
                                {application.companyType}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(application.lastUpdated).toLocaleDateString()}
                        </div>
                        {application.resumeVersion && (
                            <div className="flex items-center gap-1 text-indigo-600 font-medium">
                                <FileText className="w-3 h-3" />
                                Resume v1
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </Draggable>
    );
}
