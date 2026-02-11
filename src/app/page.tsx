import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <NeuralBackground
          color="#6366f1"
          trailOpacity={0.15}
          particleCount={600}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 font-bold">
        <Navbar />
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
