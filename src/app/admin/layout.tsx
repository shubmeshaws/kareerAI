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
        // Simple client-side guard
        if (!isAdmin()) {
            router.push("/dashboard");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (authorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                    <p className="text-slate-400 font-medium">Authorizing Admin Access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />
            <main className="pl-64 transition-all duration-300 min-h-screen">
                <div className="max-w-[1600px] mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
