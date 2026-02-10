"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Application, ApplicationStatus, getApplications, moveApplications, saveApplications } from "@/lib/application-service";
import { KanbanColumn } from "./KanbanColumn";
import { ApplicationModal } from "./ApplicationModal";
import { updateApplication, deleteApplication } from "@/lib/application-service";

const COLUMNS: { id: ApplicationStatus; title: string }[] = [
    { id: "Saved", title: "Saved" },
    { id: "Applied", title: "Applied" },
    { id: "Interview", title: "Interviewing" },
    { id: "Offer", title: "Offers" },
    { id: "Rejected", title: "Rejected" },
];

export function KanbanBoard() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setApplications(getApplications());
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as ApplicationStatus;
        const updatedApps = [...applications];
        const appIndex = updatedApps.findIndex(a => a.id === draggableId);

        if (appIndex !== -1) {
            const movedApp = {
                ...updatedApps[appIndex],
                status: newStatus,
                lastUpdated: new Date().toISOString()
            };

            // Remove from old position
            updatedApps.splice(appIndex, 1);

            // Insert into new position in the virtual filtered list
            // For simplicity, we just add it to the end or start
            updatedApps.push(movedApp);

            setApplications(updatedApps);
            saveApplications(updatedApps);
        }
    };

    const handleEdit = (app: Application) => {
        setSelectedApp(app);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteApplication(id);
        setApplications(applications.filter(a => a.id !== id));
    };

    const handleSaveApp = (updates: Partial<Application>) => {
        if (selectedApp) {
            const updated = updateApplication(selectedApp.id, updates);
            if (updated) {
                setApplications(applications.map(a => a.id === selectedApp.id ? updated : a));
            }
        }
        setIsModalOpen(false);
    };

    return (
        <div className="h-full">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 h-full overflow-x-auto pb-4 items-start">
                    {COLUMNS.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            applications={applications.filter((a) => a.status === col.id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </DragDropContext>

            <ApplicationModal
                isOpen={isModalOpen}
                application={selectedApp}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveApp}
            />
        </div>
    );
}
