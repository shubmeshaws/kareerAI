const steps = [
    {
        number: "01",
        title: "Create Your Profile",
        description: "Sign up and let our AI analyze your experience, skills, and career goals to build a comprehensive profile.",
    },
    {
        number: "02",
        title: "Optimize Your Resume",
        description: "Our AI crafts tailored resumes for each application, ensuring you pass ATS filters and catch recruiters' attention.",
    },
    {
        number: "03",
        title: "Prepare & Practice",
        description: "Use AI-powered mock interviews to practice answering questions specific to your target role and company.",
    },
    {
        number: "04",
        title: "Land Your Dream Job",
        description: "Apply with confidence, track your applications, and receive personalized guidance until you get hired.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        How{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            KareerAI
                        </span>{" "}
                        Works
                    </h2>
                    <p className="text-lg text-gray-600">
                        Four simple steps to accelerate your career journey with the power of AI.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    {/* Step Number */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-4 mx-auto lg:mx-0">
                                        <span className="text-xl font-bold text-white">{step.number}</span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center lg:text-left">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-center lg:text-left">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow for mobile */}
                                {index < steps.length - 1 && (
                                    <div className="flex justify-center my-4 lg:hidden">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
