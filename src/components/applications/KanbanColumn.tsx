"use client";

import { Application, ApplicationStatus } from "@/lib/application-service";
import { ApplicationCard } from "./ApplicationCard";
import { Droppable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
    id: ApplicationStatus;
    title: string;
    applications: Application[];
    onEdit: (app: Application) => void;
    onDelete: (id: string) => void;
}

const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
        case "Saved": return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        case "Applied": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "Interview": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.3)]";
        case "Offer": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
        case "Rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
        default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
};

export function KanbanColumn({ id, title, applications, onEdit, onDelete }: KanbanColumnProps) {
    return (
        <div className="flex flex-col w-full min-w-[320px] h-full bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-5 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] dark:from-white/[0.02] to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-6 px-1 relative">
                <h3 className="font-black text-gray-900 dark:text-gray-400 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${id === 'Interview' ? 'bg-cyan-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {title}
                    <Badge className={`${getStatusColor(id)} border text-[10px] px-2 h-5 font-black font-mono`}>
                        {applications.length.toString().padStart(2, '0')}
                    </Badge>
                </h3>
            </div>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[500px] transition-all duration-300 rounded-2xl p-1 ${snapshot.isDraggingOver ? "bg-cyan-500/[0.05] dark:bg-cyan-500/[0.03] ring-1 ring-cyan-500/20 shadow-inner" : ""
                            }`}
                    >
                        <div className="space-y-1">
                            {applications.map((app, index) => (
                                <ApplicationCard
                                    key={app.id}
                                    application={app}
                                    index={index}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
