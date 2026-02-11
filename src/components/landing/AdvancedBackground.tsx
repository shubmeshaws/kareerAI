"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AdvancedBackground() {
    const { scrollYProgress } = useScroll();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <div className="fixed inset-0 -z-10 bg-[#0E121B] overflow-hidden">
            {/* Base Glow */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent"
            />

            {/* Interactive Circles */}
            <motion.div
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 200 }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{
                    x: -mousePosition.x * 1.5,
                    y: -mousePosition.y * 1.5,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 200 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"
            />

            {/* Drifting Particles/Blobs */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: [0, 100, 0, -100, 0],
                        y: [0, -100, 100, 0, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 15 + i * 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
                    style={{
                        backgroundColor: i === 0 ? "rgba(6, 182, 212, 0.05)" : i === 1 ? "rgba(37, 99, 235, 0.05)" : "rgba(79, 70, 229, 0.05)",
                        top: `${20 + i * 20}%`,
                        left: `${10 + i * 30}%`,
                    }}
                />
            ))}

            {/* Grid Mask Overlay */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
            />
        </div>
    );
}
