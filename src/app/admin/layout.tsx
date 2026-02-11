"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth-service";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (!isAdmin()) {
            router.push("/dashboard");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (authorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] text-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-black" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Authorizing Admin Protocol...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#F2F2F2] font-sans text-slate-900 antialiased overflow-hidden">
            <AdminSidebar />

            {/* children will contain Column 2 and Column 3 */}
            <main className="flex-1 lg:pl-0 transition-all duration-300 h-screen w-full overflow-hidden flex ml-16 lg:ml-52 bg-[#F2F2F2] dark:bg-[#0E121B]">
                {children}
            </main>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D1D5DB;
                }
            `}</style>
        </div>
    );
}
