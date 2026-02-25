// src/Pages/ManageTuitions/ManageTuitions.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    LuBookOpen,
    LuSearch,
    LuFilter,
    LuChevronLeft,
    LuChevronRight,
    LuRefreshCw,
    LuEye,
    LuCheck,
    LuX,
    LuClock,
    LuUser,
    LuDollarSign,
    LuMapPin
} from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';
import { MdOutlinePostAdd } from 'react-icons/md';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../Components/Loading/Loading';
import NotFound from '../../Components/NotFound/NotFound';
import Forbidden from '../../Components/ForbiddenError/ForbiddenError';
import ServerError from '../../Components/ServerError/ServerError';
import Swal from 'sweetalert2';

const ManageTuitions = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
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
        queryKey: ['adminTuitions', user?.email, page, statusFilter, debouncedSearch],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('page', page);
            params.append('limit', 10);
            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (debouncedSearch) params.append('search', debouncedSearch);

            const response = await axiosSecure.get(`/admin/tuitions?${params.toString()}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    const approveMutation = useMutation({
        mutationFn: async (tuitionId) => {
            const response = await axiosSecure.patch(
                `/admin/tuitions/${tuitionId}/approve?email=${user?.email}`
            );
            return response.data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Tuition approved');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to approve tuition');
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (tuitionId) => {
            const response = await axiosSecure.patch(
                `/admin/tuitions/${tuitionId}/reject?email=${user?.email}`
            );
            return response.data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Tuition rejected');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to reject tuition');
        }
    });

    const handleApprove = (tuitionId, title) => {
        Swal.fire({
            title: "Approve Tuition?",
            text: `Are you sure you want to approve "${title}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve"
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate(tuitionId);
            }
        });
    };

    const handleReject = (tuitionId, title) => {
        Swal.fire({
            title: "Reject Tuition?",
            text: `Are you sure you want to reject "${title}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject"
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(tuitionId);
            }
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: <span className="badge badge-warning badge-sm">Pending</span>,
            active: <span className="badge badge-success badge-sm">Active</span>,
            rejected: <span className="badge badge-error badge-sm">Rejected</span>,
            completed: <span className="badge badge-info badge-sm">Completed</span>
        };
        return badges[status] || <span className="badge badge-ghost badge-sm">{status}</span>;
    };

    if (isLoading) return <Loading />;

    if (isError) {
        if (error?.response?.status === 403) return <Forbidden />;
        if (error?.response?.status === 404) return <NotFound />;
        return <ServerError error={error} />;
    }

    const tuitions = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content flex items-center gap-2">
                        <MdOutlinePostAdd className="text-primary" />
                        Manage Tuitions
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Review and manage all tuition posts
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
                                placeholder="Search by title, subject or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
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
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="rejected">Rejected</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tuitions Table */}
                {tuitions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <LuBookOpen className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            No tuitions found
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
                                            <th className="font-primary font-bold text-base-content">Title</th>
                                            <th className="font-primary font-bold text-base-content">Student</th>
                                            <th className="font-primary font-bold text-base-content">Subject</th>
                                            <th className="font-primary font-bold text-base-content">Class</th>
                                            <th className="font-primary font-bold text-base-content">Budget</th>
                                            <th className="font-primary font-bold text-base-content">Location</th>
                                            <th className="font-primary font-bold text-base-content">Posted</th>
                                            <th className="font-primary font-bold text-base-content">Status</th>
                                            <th className="font-primary font-bold text-base-content text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tuitions.map((tuition) => (
                                            <tr key={tuition._id} className="hover">
                                                <td>
                                                    <div className="font-medium">{tuition.title}</div>
                                                    {tuition.applicants > 0 && (
                                                        <div className="text-xs text-gray-500">
                                                            {tuition.applicants} applicant(s)
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <LuUser className="text-gray-400" size={14} />
                                                        <span>{tuition.studentName}</span>
                                                    </div>
                                                </td>
                                                <td>{tuition.subject}</td>
                                                <td>{tuition.class}</td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <LuDollarSign className="text-primary" size={14} />
                                                        <span>{tuition.minBudget} - {tuition.maxBudget}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <LuMapPin className="text-gray-400" size={14} />
                                                        <span>{tuition.location}</span>
                                                    </div>
                                                </td>
                                                <td>{formatDate(tuition.posted)}</td>
                                                <td>{getStatusBadge(tuition.status)}</td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => window.open(`/tuitions/${tuition._id}`, '_blank')}
                                                            className="btn btn-circle btn-xs btn-ghost text-primary"
                                                            title="View"
                                                        >
                                                            <LuEye size={16} />
                                                        </button>

                                                        {tuition.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(tuition._id, tuition.title)}
                                                                    disabled={approveMutation.isPending}
                                                                    className="btn btn-circle btn-xs btn-ghost text-success"
                                                                    title="Approve"
                                                                >
                                                                    <LuCheck size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(tuition._id, tuition.title)}
                                                                    disabled={rejectMutation.isPending}
                                                                    className="btn btn-circle btn-xs btn-ghost text-error"
                                                                    title="Reject"
                                                                >
                                                                    <LuX size={16} />
                                                                </button>
                                                            </>
                                                        )}
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

export default ManageTuitions;