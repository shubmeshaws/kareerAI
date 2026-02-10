import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    MessageSquare,
    Briefcase,
    TrendingUp,
    Plus,
    ArrowRight
} from "lucide-react";

const stats = [
    {
        label: "Resumes Created",
        value: "3",
        change: "+1 this week",
        icon: FileText,
        color: "from-blue-500 to-cyan-500"
    },
    {
        label: "Interview Sessions",
        value: "12",
        change: "+4 this week",
        icon: MessageSquare,
        color: "from-purple-500 to-pink-500"
    },
    {
        label: "Jobs Applied",
        value: "24",
        change: "+8 this week",
        icon: Briefcase,
        color: "from-orange-500 to-red-500"
    },
    {
        label: "Profile Score",
        value: "85%",
        change: "+5% improvement",
        icon: TrendingUp,
        color: "from-green-500 to-emerald-500"
    },
];

const quickActions = [
    { label: "New Resume", icon: FileText, href: "/dashboard/resumes" },
    { label: "Practice Interview", icon: MessageSquare, href: "/dashboard/interviews" },
    { label: "Browse Jobs", icon: Briefcase, href: "/dashboard/jobs" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h1>
                <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your career today.</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
                {quickActions.map((action) => (
                    <Button
                        key={action.label}
                        variant="outline"
                        className="gap-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    >
                        <Plus className="w-4 h-4" />
                        {action.label}
                    </Button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Resumes */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Resumes</h2>
                        <Button variant="ghost" size="sm" className="text-indigo-600 gap-1">
                            View all <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {["Software Engineer Resume", "Product Manager CV", "Data Analyst Resume"].map((resume, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{resume}</p>
                                    <p className="text-sm text-gray-500">Updated 2 days ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming Interviews */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Interview Prep</h2>
                        <Button variant="ghost" size="sm" className="text-indigo-600 gap-1">
                            View all <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: "Technical Interview", company: "Google", date: "Tomorrow" },
                            { title: "Behavioral Round", company: "Meta", date: "In 3 days" },
                            { title: "System Design", company: "Amazon", date: "Next week" },
                        ].map((interview, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{interview.title}</p>
                                    <p className="text-sm text-gray-500">{interview.company} • {interview.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
