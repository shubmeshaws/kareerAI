import { Card } from "@/components/ui/card";
import {
    FileText,
    MessageSquare,
    Target,
    TrendingUp,
    Brain,
    Zap
} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "AI Resume Builder",
        description: "Create ATS-optimized resumes tailored to specific job descriptions with intelligent keyword suggestions.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: MessageSquare,
        title: "Interview Prep",
        description: "Practice with AI-powered mock interviews and receive personalized feedback to boost your confidence.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Target,
        title: "Job Matching",
        description: "Get matched with opportunities that align with your skills, experience, and career aspirations.",
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: TrendingUp,
        title: "Career Insights",
        description: "Access industry trends, salary benchmarks, and growth opportunities in your field.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: Brain,
        title: "Skills Analysis",
        description: "Identify skill gaps and get personalized learning recommendations to advance your career.",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        icon: Zap,
        title: "Application Tracking",
        description: "Manage all your job applications in one place with automated status updates and reminders.",
        gradient: "from-yellow-500 to-orange-500",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Succeed
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Powerful AI tools designed to give you an unfair advantage in your job search.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="p-6 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
