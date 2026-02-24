// src/Pages/MyApplications/MyApplications.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    LuBriefcase,
    LuClock,
    LuDollarSign,
    LuMapPin,
    LuBookOpen,
    LuFilter,
    LuRefreshCw,
    LuChevronLeft,
    LuChevronRight,
    LuEye,
    LuTrash2,
} from 'react-icons/lu';
import { CgBell, CgEditMarkup } from 'react-icons/cg';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../Components/Loading/Loading';
import UpdateApplicationModal from '../../Components/UpdateApplicationModal/UpdateApplicationModal';
import { FaRegEdit } from 'react-icons/fa';

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['myApplications', user?.email, filter, page],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('page', page);
            params.append('limit', 10);
            if (filter !== 'all') {
                params.append('status', filter);
            }

            const response = await axiosSecure.get(`/applications/my-applications?${params.toString()}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const response = await axiosSecure.delete(`/applications/${id}?email=${user?.email}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myApplications', user?.email]);
            toast.success('Application withdrawn successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to withdraw application');
        }
    });

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to withdraw your application for "${title}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    const handleUpdate = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: <span className="badge badge-warning badge-sm">Pending</span>,
            approved: <span className="badge badge-success badge-sm">Approved</span>,
            rejected: <span className="badge badge-error badge-sm">Rejected</span>
        };
        return badges[status] || <span className="badge badge-ghost badge-sm">{status}</span>;
    };

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <CgBell className="text-4xl text-red-500" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            Failed to load applications
                        </h3>
                        <p className="text-gray-600 mb-6">{error?.message || 'Something went wrong'}</p>
                        <button
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <LuRefreshCw />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const applications = data?.data || [];
    const pagination = data?.pagination;

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-primary font-bold text-base-content">
                            My Applications
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Track your tuition applications
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex items-center gap-4 overflow-x-auto">
                            <LuFilter className="text-gray-400 flex-shrink-0" />
                            <div className="tabs tabs-boxed">
                                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setFilter(status);
                                            setPage(1);
                                        }}
                                        className={`tab tab-sm ${filter === status ? 'tab-active' : ''}`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Applications List */}
                    {applications.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <LuBriefcase className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                                No applications found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filter === 'all'
                                    ? "You haven't applied to any tuitions yet"
                                    : `No ${filter} applications found`}
                            </p>
                            <Link
                                to="/tuitions"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <LuBriefcase />
                                Browse Tuitions
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div
                                        key={app._id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-xl font-primary font-bold text-base-content">
                                                        {app.tuition?.title}
                                                    </h3>
                                                    {getStatusBadge(app.status)}
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <LuBookOpen className="text-primary" />
                                                        <span>{app.tuition?.subject}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <LuClock className="text-primary" />
                                                        <span>{app.tuition?.schedule?.days}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <LuDollarSign className="text-primary" />
                                                        <span>{app.expectedSalary} BDT</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <LuMapPin className="text-primary" />
                                                        <span>{app.tuition?.location}</span>
                                                    </div>
                                                </div>

                                                <div className="text-sm text-gray-600">
                                                    <p><span className="font-medium">Qualifications:</span> {app.qualifications}</p>
                                                    <p><span className="font-medium">Experience:</span> {app.experience} years</p>
                                                    <p><span className="font-medium">Applied:</span> {formatDate(app.appliedAt)}</p>
                                                </div>
                                            </div>

                                            <div className="flex md:flex-col gap-2">
                                                <Link
                                                    to={`/tuitions/${app.tuition?._id}`}
                                                    className="btn btn-circle btn-sm btn-ghost text-primary"
                                                    title="View Tuition"
                                                >
                                                    <LuEye size={18} />
                                                </Link>
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdate(app)}
                                                            className="btn btn-circle btn-sm btn-ghost text-primary"
                                                            title="Edit Application"
                                                        >
                                                            <FaRegEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(app._id, app.tuition?.title)}
                                                            disabled={deleteMutation.isPending}
                                                            className="btn btn-circle btn-sm btn-ghost text-error"
                                                            title="Withdraw Application"
                                                        >
                                                            <LuTrash2 size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

            {/* Update Modal */}
            {selectedApplication && (
                <UpdateApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedApplication(null);
                    }}
                    application={selectedApplication}
                    onSuccess={() => {
                        queryClient.invalidateQueries(['myApplications', user?.email]);
                    }}
                />
            )}
        </>
    );
};

export default MyApplications;