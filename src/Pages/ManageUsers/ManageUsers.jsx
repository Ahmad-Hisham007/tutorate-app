// src/Pages/ManageUsers/ManageUsers.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    LuUsers,
    LuSearch,
    LuFilter,
    LuChevronLeft,
    LuChevronRight,
    LuRefreshCw,
    LuTrash2,
    LuUserCheck,
    LuUserX,
    LuMail,
    LuPhone,
    LuCalendar
} from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../Components/Loading/Loading';
import NotFound from '../../Components/NotFound/NotFound';
import Forbidden from '../../Components/ForbiddenError/ForbiddenError';
import ServerError from '../../Components/ServerError/ServerError';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['adminUsers', user?.email, page, roleFilter, statusFilter, debouncedSearch],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('page', page);
            params.append('limit', 10);
            if (roleFilter !== 'all') params.append('role', roleFilter);
            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (debouncedSearch) params.append('search', debouncedSearch);

            const response = await axiosSecure.get(`/admin/users?${params.toString()}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, role }) => {
            const response = await axiosSecure.patch(
                `/admin/users/${userId}/role?email=${user?.email}`,
                { role }
            );
            return response.data;
        },
        onSuccess: () => {
            refetch(); // 👈 Use refetch instead of queryClient.invalidateQueries
            toast.success('User role updated');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update role');
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ userId, status }) => {
            const response = await axiosSecure.patch(
                `/admin/users/${userId}/status?email=${user?.email}`,
                { status }
            );
            return response.data;
        },
        onSuccess: () => {
            refetch(); // 👈 Use refetch
            toast.success('User status updated');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update status');
        }
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            const response = await axiosSecure.delete(
                `/admin/users/${userId}?email=${user?.email}`
            );
            return response.data;
        },
        onSuccess: () => {
            refetch(); // 👈 Use refetch
            toast.success('User deleted');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to delete user');
        }
    });


    const handleRoleChange = (userId, newRole) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Change user role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({ userId, role: newRole });
                Swal.fire({
                    title: "Updated",
                    text: "User role updated",
                    icon: "success"
                });
            }
        });
    };

    const handleStatusChange = (userId, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${newStatus === 'blocked' ? 'Block this user?' : `Update status to ${newStatus}?`} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ userId, status: newStatus });
                Swal.fire({
                    title: "Updated",
                    text: "User status updated",
                    icon: "success"
                });
            }
        });
    };

    const handleDelete = (userId, userName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure you want to delete ${userName}?`,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutate(userId);
                Swal.fire({
                    title: "Deleted",
                    text: "User deleted",
                    icon: "success"
                });
            }
        });
        // if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
        //     deleteUserMutation.mutate(userId);
        // }
    };

    if (isLoading) return <Loading />;

    if (isError) {
        if (error?.response?.status === 403) return <Forbidden />;
        if (error?.response?.status === 404) return <NotFound />;
        return <ServerError error={error} />;
    }

    const users = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content flex items-center gap-2">
                        <MdOutlineManageAccounts className="text-primary" />
                        Manage Users
                    </h1>
                    <p className="text-gray-600 mt-2">
                        View and manage all platform users
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
                        </div>

                        {/* Role Filter */}
                        <div className="flex items-center gap-2">
                            <LuFilter className="text-gray-400" />
                            <select
                                value={roleFilter}
                                onChange={(e) => {
                                    setRoleFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="select select-bordered"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="tutor">Tutor</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <LuFilter className="text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="select select-bordered"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                                <option value="pending">Pending</option>
                                <option value="deleted">Deleted</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                {users.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <LuUsers className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            No users found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your filters
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="font-primary font-bold text-base-content">User</th>
                                            <th className="font-primary font-bold text-base-content">Contact</th>
                                            <th className="font-primary font-bold text-base-content">Role</th>
                                            <th className="font-primary font-bold text-base-content">Status</th>
                                            <th className="font-primary font-bold text-base-content">Joined</th>
                                            <th className="font-primary font-bold text-base-content text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover">
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}`}
                                                            alt={u.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <div className="font-medium">{u.name}</div>
                                                            <div className="text-xs text-gray-500">ID: {u._id.slice(-6)}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <LuMail className="text-gray-400" size={14} />
                                                        <span>{u.email}</span>
                                                    </div>
                                                    {u.phone && (
                                                        <div className="flex items-center gap-2 text-sm mt-1">
                                                            <LuPhone className="text-gray-400" size={14} />
                                                            <span>{u.phone}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <select
                                                        value={u.role}
                                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                        className="select select-bordered select-xs w-full max-w-xs"
                                                        disabled={u.email === user?.email} // Can't change own role
                                                    >
                                                        <option value="student">Student</option>
                                                        <option value="tutor">Tutor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        value={u.status}
                                                        onChange={(e) => handleStatusChange(u._id, e.target.value)}
                                                        className="select select-bordered select-xs w-full max-w-xs"
                                                        disabled={u.email === user?.email} // Can't change own status
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="blocked">Blocked</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="deleted">Deleted</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <LuCalendar className="text-gray-400" size={14} />
                                                        <span>{formatDate(u.createdAt)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleDelete(u._id, u.name)}
                                                            disabled={u.email === user?.email || deleteUserMutation.isPending}
                                                            className="btn btn-circle btn-xs btn-ghost text-error"
                                                            title="Delete User"
                                                        >
                                                            <LuTrash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {pagination?.pages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="btn btn-outline btn-sm"
                                >
                                    <LuChevronLeft />
                                    Previous
                                </button>
                                <span className="text-sm text-gray-600">
                                    Page {page} of {pagination.pages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                    disabled={page === pagination.pages}
                                    className="btn btn-outline btn-sm"
                                >
                                    Next
                                    <LuChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;