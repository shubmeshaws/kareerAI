"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    MoreHorizontal,
    UserPlus,
    Shield,
    Mail,
    Filter
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialUsers: any[] = [];

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => console.error("Failed to load users", err));
    }, []);

    const filteredUsers = users.filter((u: any) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
                    <p className="text-slate-400">Total {users.length} registered accounts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 border-2">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <div className="p-4 border-b border-slate-800">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-950 border-slate-800 focus:border-indigo-500 text-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest px-6">User</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Plan</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Risk</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Usage</TableHead>
                                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-right px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading users...</TableCell>
                                </TableRow>
                            ) : filteredUsers.map((user: any) => (
                                <TableRow key={user.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-200">{user.name}</span>
                                                <span className="text-xs text-slate-500">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`text-[10px] font-bold border-2 ${user.plan === 'PRO' ? 'border-indigo-500/50 text-indigo-400' : 'border-slate-800 text-slate-400'
                                            }`}>
                                            {user.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-xs font-bold ${user.status === 'ACTIVE' ? 'text-emerald-400' :
                                            user.status === 'SUSPENDED' ? 'text-rose-400' : 'text-slate-500'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {/* Mock Risk Score for now */}
                                        <Badge variant="outline" className={`text-[10px] font-bold border ${Math.random() > 0.8 ? 'border-rose-500/30 text-rose-400 bg-rose-500/10' : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'}`}>
                                            {Math.random() > 0.8 ? 'HIGH RISK' : 'LOW RISK'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-400 font-medium">
                                        {user.usage.resumesGenerated} Resumes
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer" onClick={() => window.location.href = `/admin/users/${user.id}`}>
                                                    <Shield className="w-4 h-4 mr-2" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer" onClick={async () => {
                                                    const res = await fetch(`/api/admin/users/${user.id}/impersonate`, { method: 'POST' });
                                                    const data = await res.json();
                                                    if (data.success) window.location.href = data.redirectUrl;
                                                }}>
                                                    <UserPlus className="w-4 h-4 mr-2" /> Login as User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                                    <Mail className="w-4 h-4 mr-2" /> Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-800" />
                                                <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer">
                                                    Suspend Account
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
