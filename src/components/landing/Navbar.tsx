"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E121B]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Kareer<span className="text-cyan-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-sm font-black text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group">
              Capabilities
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#how-it-works" className="text-sm font-black text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#pricing" className="text-sm font-black text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group">
              Access
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-cyan-400 hover:bg-cyan-500/5 font-black uppercase tracking-widest text-xs px-6 h-10 rounded-full border border-white/5 transition-all">
                Initialize
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 h-11 rounded-full shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-xs uppercase tracking-widest">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0E121B]/95 backdrop-blur-2xl border-white/10 p-8 w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
                  <Link href="/login">
                    <Button variant="outline" className="w-full h-12 text-white border-white/10 hover:bg-white/5">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
