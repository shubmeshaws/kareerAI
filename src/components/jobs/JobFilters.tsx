"use client";

import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { JobFilters as JobFiltersType } from "@/lib/job-service";

interface JobFiltersProps {
    filters: JobFiltersType;
    onFilterChange: (filters: JobFiltersType) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">Protocol Type</h3>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-500/50" />
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-500 transition-colors" />
                    <Input
                        placeholder="Filter by role vector..."
                        value={filters.role}
                        onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
                        className="pl-12 h-12 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">Geolocation Index</h3>
                <Select
                    value={filters.location}
                    onValueChange={(value) => onFilterChange({ ...filters, location: value })}
                >
                    <SelectTrigger className="h-12 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-bold">
                        <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#0E121B] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white backdrop-blur-xl">
                        <SelectItem value="All">GLOBAL ACCESS</SelectItem>
                        <SelectItem value="remote">REMOTE OPS</SelectItem>
                        <SelectItem value="San Francisco">SAN FRANCISCO</SelectItem>
                        <SelectItem value="New York">NEW YORK</SelectItem>
                        <SelectItem value="London">LONDON</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest">Entity Classification</h3>
                <div className="grid grid-cols-1 gap-2">
                    {["All", "Product", "Startup", "Service"].map((type) => (
                        <button
                            key={type}
                            onClick={() => onFilterChange({ ...filters, companyType: type as any })}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all font-bold text-xs ${filters.companyType === type
                                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                : "bg-gray-50/50 dark:bg-white/2 border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <span className="uppercase tracking-widest">{type === 'All' ? 'ANY ENTITY' : type}</span>
                            {filters.companyType === type && <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-white/2 border border-gray-100 dark:border-white/5 rounded-2xl group hover:border-cyan-500/30 transition-all cursor-pointer"
                    onClick={() => onFilterChange({ ...filters, remoteOnly: !filters.remoteOnly })}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${filters.remoteOnly ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600'}`}>
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Remote Only</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-tighter">Satellite Sync</p>
                        </div>
                    </div>
                    <Checkbox
                        checked={filters.remoteOnly}
                        onCheckedChange={(checked) => onFilterChange({ ...filters, remoteOnly: checked as boolean })}
                        className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                    />
                </div>
            </div>
        </div>
    );
}
