import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0E121B] text-gray-900 dark:text-white overflow-hidden relative transition-colors duration-500">
            {/* Neural Background for Dashboard - Subtle */}
            <div className="fixed inset-0 z-0 opacity-10 dark:opacity-40 pointer-events-none transition-opacity duration-1000">
                <NeuralBackground
                    particleCount={200}
                    trailOpacity={0.05}
                    speed={0.4}
                />
            </div>

            <div className="relative z-10 flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
