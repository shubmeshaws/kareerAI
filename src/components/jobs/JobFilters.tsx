"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { JobFilters as JobFiltersType, CompanyType } from "@/lib/job-service";

interface JobFiltersProps {
    filters: JobFiltersType;
    onFilterChange: (filters: JobFiltersType) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
    const handleChange = (key: keyof JobFiltersType, value: any) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <Card className="p-6 space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            </div>

            <div className="space-y-4">
                {/* Role Filter */}
                <div className="space-y-2">
                    <Label htmlFor="role">Role / Keywords</Label>
                    <Input
                        id="role"
                        placeholder="e.g. Frontend, React"
                        value={filters.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    />
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        placeholder="e.g. San Francisco, Remote"
                        value={filters.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select
                        value={filters.experience}
                        onValueChange={(value) => handleChange("experience", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Any Experience" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Any Experience</SelectItem>
                            <SelectItem value="Entry">Entry Level</SelectItem>
                            <SelectItem value="Mid">Mid Level</SelectItem>
                            <SelectItem value="Senior">Senior Level</SelectItem>
                            <SelectItem value="Lead">Lead / Management</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Company Type */}
                <div className="space-y-2">
                    <Label>Company Type</Label>
                    <Select
                        value={filters.companyType}
                        onValueChange={(value) => handleChange("companyType", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Any Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Any Type</SelectItem>
                            <SelectItem value="Startup">Startup</SelectItem>
                            <SelectItem value="Product">Product Company</SelectItem>
                            <SelectItem value="Service">Service / Agency</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Remote Toggle */}
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="remote"
                        checked={filters.remoteOnly}
                        onCheckedChange={(checked) => handleChange("remoteOnly", checked)}
                    />
                    <Label
                        htmlFor="remote"
                        className="text-sm font-medium leading-none cursor-pointer"
                    >
                        Remote Jobs Only
                    </Label>
                </div>
            </div>
        </Card>
    );
}
