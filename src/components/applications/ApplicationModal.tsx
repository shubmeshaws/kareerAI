"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Application, ApplicationStatus } from "@/lib/application-service";
import { getFollowUpTemplate } from "@/lib/followup-templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ExternalLink, Calendar, MessageSquare, Zap } from "lucide-react";

interface ApplicationModalProps {
    application: Application | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (app: Partial<Application>) => void;
}

export function ApplicationModal({ application, isOpen, onClose, onSave }: ApplicationModalProps) {
    const [formData, setFormData] = useState<Partial<Application>>({});
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (application) {
            setFormData(application);
        } else {
            setFormData({
                status: "Saved",
                companyName: "",
                role: "",
                notes: "",
                appliedDate: new Date().toISOString().split("T")[0]
            });
        }
    }, [application, isOpen]);

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    const copyTemplate = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const template = application
        ? getFollowUpTemplate(application.companyName, application.role, application.status, 7)
        : null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0E121B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white backdrop-blur-2xl rounded-[2.5rem] shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
                <DialogHeader className="pt-4 px-2">
                    <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 flex items-center justify-center p-0.5 shadow-lg">
                            <div className="w-full h-full bg-white dark:bg-[#0E121B] rounded-[0.55rem] flex items-center justify-center">
                                <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                            </div>
                        </div>
                        {application ? "MODIFY RECORD" : "INITIALIZE ENTRY"}
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="details" className="mt-6">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl h-14 border border-gray-100 dark:border-white/5 shadow-inner">
                        <TabsTrigger value="details" className="rounded-xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 data-[state=active]:shadow-sm h-full transition-all">Details Console</TabsTrigger>
                        <TabsTrigger value="outreach" disabled={!application} className="rounded-xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm h-full transition-all">Outreach Node</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-6 py-6 px-2">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2.5 group">
                                <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Target Company</Label>
                                <Input
                                    id="company"
                                    value={formData.companyName}
                                    placeholder="Enter company node..."
                                    className="h-12 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold shadow-inner"
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2.5 group">
                                <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Active Role</Label>
                                <Input
                                    id="role"
                                    value={formData.role}
                                    placeholder="Enter role signature..."
                                    className="h-12 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold shadow-inner"
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2.5 group">
                                <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Sync Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value as ApplicationStatus })}
                                >
                                    <SelectTrigger className="h-12 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold shadow-inner">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-[#0E121B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white backdrop-blur-xl">
                                        <SelectItem value="Saved" className="focus:bg-gray-100 dark:focus:bg-white/5 cursor-pointer">SAVED</SelectItem>
                                        <SelectItem value="Applied" className="focus:bg-gray-100 dark:focus:bg-white/5 cursor-pointer">APPLIED</SelectItem>
                                        <SelectItem value="Interview" className="focus:bg-gray-100 dark:focus:bg-white/5 cursor-pointer">INTERVIEW</SelectItem>
                                        <SelectItem value="Offer" className="focus:bg-gray-100 dark:focus:bg-white/5 cursor-pointer">OFFER</SelectItem>
                                        <SelectItem value="Rejected" className="focus:bg-gray-100 dark:focus:bg-white/5 cursor-pointer">REJECTED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5 group">
                                <Label htmlFor="date" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Timestamp</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.appliedDate?.split("T")[0]}
                                    className="h-12 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold dark:[color-scheme:dark] shadow-inner"
                                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5 group">
                            <Label htmlFor="notes" className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Neural Notes & Logs</Label>
                            <Textarea
                                id="notes"
                                placeholder="Log mission-critical details, interviewer traits, or encounter dynamics..."
                                className="h-40 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-2xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium leading-relaxed custom-scrollbar shadow-inner"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="outreach" className="space-y-6 py-6 px-2">
                        {template && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="bg-gradient-to-br from-cyan-600/10 to-indigo-600/10 dark:from-cyan-500/10 dark:to-indigo-600/10 border border-cyan-500/20 rounded-[1.5rem] p-6 relative overflow-hidden group shadow-sm dark:shadow-none">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />
                                    <h4 className="text-[11px] font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-3 mb-3 uppercase tracking-[0.2em]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                                        Recommended Transmission
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        Intelligence suggests a follow-up is optimal. Deploy this synthesized communication pattern.
                                    </p>
                                </div>

                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Subject Protocol</Label>
                                    <Input readOnly value={template.subject} className="h-12 bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-cyan-600 dark:text-cyan-400 font-bold rounded-xl shadow-inner" />
                                </div>

                                <div className="space-y-2.5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Body Synthetics</Label>
                                    <div className="relative group">
                                        <Textarea
                                            readOnly
                                            value={template.body}
                                            className="bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 h-60 text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed rounded-2xl pr-12 focus:ring-indigo-500/50 shadow-inner custom-scrollbar"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-3 right-3 h-10 w-10 bg-white/80 dark:bg-black/40 hover:bg-gray-100 dark:hover:bg-black/60 text-gray-500 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl shadow-sm"
                                            onClick={() => copyTemplate(template.body)}
                                        >
                                            {copied ? <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-5 h-5" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-8 gap-3 sm:gap-0 pb-2">
                    <Button variant="ghost" onClick={onClose} className="rounded-xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 h-12 px-6">ABORT</Button>
                    <Button
                        className="h-12 px-8 bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 hover:scale-[1.02] active:scale-95 text-white font-black uppercase tracking-widest text-[11px] rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                        onClick={handleSave}
                    >
                        {application ? "COMMIT UPDATES" : "DEPLOY ENTRY"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
