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
import { Copy, Check, ExternalLink, Calendar, MessageSquare } from "lucide-react";

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
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{application ? "Edit Application" : "Add Application"}</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="details" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="outreach" disabled={!application}>Outreach Tool</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value as ApplicationStatus })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Saved">Saved</SelectItem>
                                        <SelectItem value="Applied">Applied</SelectItem>
                                        <SelectItem value="Interview">Interview</SelectItem>
                                        <SelectItem value="Offer">Offer</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Applied Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.appliedDate?.split("T")[0]}
                                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes & Reminders</Label>
                            <Textarea
                                id="notes"
                                placeholder="Next steps, interviewer names, or technical questions asked..."
                                className="h-32"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="outreach" className="space-y-4 py-4">
                        {template && (
                            <div className="space-y-4">
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Recommended Follow-up
                                    </h4>
                                    <p className="text-xs text-indigo-700 leading-relaxed">
                                        It's been 7 days since your last update. Use this template to check in with the recruiter.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Email Subject</Label>
                                    <Input readOnly value={template.subject} className="bg-gray-50 font-medium" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Email Body</Label>
                                    <div className="relative">
                                        <Textarea
                                            readOnly
                                            value={template.body}
                                            className="bg-gray-50 h-48 text-xs font-mono leading-relaxed pr-10"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-2 right-2 h-8 w-8"
                                            onClick={() => copyTemplate(template.body)}
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        className="bg-gray-900 hover:bg-indigo-600"
                        onClick={handleSave}
                    >
                        {application ? "Update Application" : "Save Application"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
