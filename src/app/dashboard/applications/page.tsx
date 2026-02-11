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
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3 uppercase">
                        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.2)] dark:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                            <Briefcase className="w-6 h-6 text-white" />
                        </span>
                        Application Tracker
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Track your job hunt progress and manage outreach in one place.
                    </p>
                </div>

                <Button
                    className="bg-gray-900 dark:bg-white/10 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl transition-all shadow-sm dark:shadow-none flex items-center gap-3 px-6"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    New Protocol Entry
                </Button>
            </div>

            <div className="flex-1 min-h-0 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/5 p-6 backdrop-blur-sm shadow-sm dark:shadow-none overflow-hidden transition-colors duration-500">
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
