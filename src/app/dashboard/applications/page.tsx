"use client";

import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { Briefcase, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ApplicationModal } from "@/components/applications/ApplicationModal";
import { addApplication, getApplications } from "@/lib/application-service";

export default function ApplicationsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddApp = (data: any) => {
        addApplication(data);
        // Board will refresh on refocus or manual trigger 
        // In a real app we'd use a state management lib or context
        window.location.reload();
    };

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </span>
                        Application Tracker
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Track your job hunt progress and manage outreach in one place.
                    </p>
                </div>

                <Button
                    className="bg-gray-900 hover:bg-indigo-600 flex items-center gap-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Add Manual Entry
                </Button>
            </div>

            <div className="flex-1 min-h-0 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-hidden">
                <KanbanBoard />
            </div>

            <ApplicationModal
                isOpen={isModalOpen}
                application={null}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddApp}
            />
        </div>
    );
}
