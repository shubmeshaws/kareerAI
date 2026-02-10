"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Search,
    Filter,
    Calendar,
    User,
    FileText,
    Briefcase,
    Zap,
    MessageSquare,
    CheckCircle2,
    RefreshCw
} from "lucide-react";
import { ActivityLog, ActivityType } from "@/lib/types/admin-activity";
import { formatDistanceToNow } from "date-fns";

const ActivityIcon = ({ type }: { type: ActivityType }) => {
    switch (type) {
        case "resume_uploaded": return <FileText className="w-4 h-4 text-blue-400" />;
        case "job_saved": return <Briefcase className="w-4 h-4 text-emerald-400" />;
        case "resume_generated": return <Zap className="w-4 h-4 text-amber-400" />;
        case "cover_letter_generated": return <FileText className="w-4 h-4 text-purple-400" />;
        case "linkedin_message_generated": return <MessageSquare className="w-4 h-4 text-sky-400" />;
        case "auto_match_run": return <RefreshCw className="w-4 h-4 text-indigo-400" />;
        case "application_status_updated": return <CheckCircle2 className="w-4 h-4 text-pink-400" />;
        default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
};

const ActivityLabel = ({ type }: { type: ActivityType }) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterUser, setFilterUser] = useState("");
    const [filterAction, setFilterAction] = useState<ActivityType | "all">("all");

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterUser) params.append('userId', filterUser);
            if (filterAction !== 'all') params.append('action', filterAction);

            const res = await fetch(`/api/admin/activities?${params.toString()}`);
            setActivities(await res.json());
        } catch (e) {
            console.error("Failed to fetch activities", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => fetchActivities(), 500);
        return () => clearTimeout(timer);
    }, [filterUser, filterAction]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Logs & Activities</h1>
                    <p className="text-slate-400">Timeline of user interactions and automated processes.</p>
                </div>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Filter by User ID or Name..."
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                            className="pl-10 bg-slate-950 border-slate-800 focus:border-indigo-500 text-white"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            className="w-full h-10 px-3 py-2 rounded-md border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={filterAction}
                            onChange={(e) => setFilterAction(e.target.value as any)}
                        >
                            <option value="all">All Events</option>
                            <option value="resume_uploaded">Resume Uploaded</option>
                            <option value="job_saved">Job Saved</option>
                            <option value="resume_generated">Resume Generated</option>
                            <option value="cover_letter_generated">Cover Letter Gen</option>
                            <option value="linkedin_message_generated">LinkedIn Msg Gen</option>
                            <option value="auto_match_run">Auto Match Run</option>
                            <option value="application_status_updated">Status Updated</option>
                        </select>
                    </div>
                    <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900" onClick={fetchActivities}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                </div>
            </Card>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading timeline...</div>
                ) : activities.length > 0 ? activities.map((activity, index) => (
                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <ActivityIcon type={activity.action} />
                        </div>

                        {/* Card */}
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-slate-900 border-slate-800 hover:border-indigo-500/30 transition-all">
                            <div className="flex items-center justify-between mb-1">
                                <div className="font-bold text-slate-200">
                                    <ActivityLabel type={activity.action} />
                                </div>
                                <time className="font-mono text-[10px] text-slate-500">{formatDistanceToNow(new Date(activity.timestamp))} ago</time>
                            </div>
                            <div className="text-sm text-slate-400 mb-3">
                                <span className="text-indigo-400 font-medium">@{activity.userName}</span> performed this action.
                            </div>

                            {/* Metadata Badges */}
                            <div className="flex flex-wrap gap-2">
                                {activity.metadata?.jobId && (
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-[10px] hover:bg-slate-700">
                                        Job: {activity.metadata.jobId}
                                    </Badge>
                                )}
                                {activity.metadata?.resumeId && (
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-[10px] hover:bg-slate-700">
                                        Resume: {activity.metadata.resumeId}
                                    </Badge>
                                )}
                            </div>

                            {/* Details JSON (Collapsible optional, showing summary for now) */}
                            {activity.details && (
                                <div className="mt-3 p-2 bg-slate-950 rounded text-xs font-mono text-slate-500 truncate">
                                    {JSON.stringify(activity.details)}
                                </div>
                            )}
                        </Card>
                    </div>
                )) : (
                    <div className="text-center py-12 text-slate-500">No activities found matching criteria.</div>
                )}
            </div>
        </div>
    );
}
