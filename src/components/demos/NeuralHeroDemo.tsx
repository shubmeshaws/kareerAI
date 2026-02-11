"use client";

import React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function NeuralHeroDemo() {
    return (
        // Container must have a defined height, or use h-screen
        <div className="relative w-full h-screen bg-black">
            <NeuralBackground
                color="#818cf8" // Indigo-400
                trailOpacity={0.1} // Lower = longer trails
                speed={0.8}
                particleCount={800}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter text-center px-4">
                    NEURAL <br />
                    <span className="text-indigo-400">CONNECTIVITY</span>
                </h1>
                <p className="mt-6 text-gray-400 text-xl font-medium tracking-wide uppercase">
                    High-Performance Flow Field Interactivity
                </p>
            </div>
        </div>
    );
}
