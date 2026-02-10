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
        case "Saved": return "bg-gray-100 text-gray-700";
        case "Applied": return "bg-blue-100 text-blue-700";
        case "Interview": return "bg-purple-100 text-purple-700";
        case "Offer": return "bg-green-100 text-green-700";
        case "Rejected": return "bg-red-100 text-red-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

export function KanbanColumn({ id, title, applications, onEdit, onDelete }: KanbanColumnProps) {
    return (
        <div className="flex flex-col w-full min-w-[300px] h-full bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    {title}
                    <Badge className={`${getStatusColor(id)} border-none text-[10px] px-1.5 h-5`}>
                        {applications.length}
                    </Badge>
                </h3>
            </div>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[500px] transition-colors rounded-xl ${snapshot.isDraggingOver ? "bg-indigo-50/50" : ""
                            }`}
                    >
                        {applications.map((app, index) => (
                            <ApplicationCard
                                key={app.id}
                                application={app}
                                index={index}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
