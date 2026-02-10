"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Sparkles } from "lucide-react";
import { PLANS, PlanTier } from "@/lib/subscription-service";
import Link from "next/link";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason: string;
    requiredTier?: PlanTier;
}

export function UpgradeModal({ isOpen, onClose, reason, requiredTier = "Pro" }: UpgradeModalProps) {
    const plan = PLANS[requiredTier];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl border-none">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Crown className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Zap className="w-6 h-6 text-yellow-300" />
                        </div>
                        <DialogTitle className="text-2xl font-bold mb-2">Upgrade to {requiredTier}</DialogTitle>
                        <DialogDescription className="text-indigo-100 text-sm leading-relaxed">
                            {reason} Upgrade your plan to unlock full access and accelerate your career.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-8 bg-white space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Features included in {requiredTier}</p>
                        {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <Link href="/dashboard/billing">
                            <Button className="w-full h-12 bg-gray-900 hover:bg-indigo-600 rounded-xl font-bold gap-2 text-white">
                                <Sparkles className="w-4 h-4" />
                                View All Plans
                            </Button>
                        </Link>
                        <Button variant="ghost" className="w-full mt-2 text-gray-500 hover:text-gray-900" onClick={onClose}>
                            Maybe later
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
