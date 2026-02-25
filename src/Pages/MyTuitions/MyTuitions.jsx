// src/Pages/Tuitions/MyTuitions/MyTuitions.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useClassOptions from '../../Hooks/useClassOptions';
import useSubjectOptions from '../../Hooks/useSubjectOptions';
import { toast } from 'react-hot-toast';
import {
    LuPlus,
    LuEye,
    LuTrash2,
    LuUsers,
    LuDollarSign,
    LuMapPin,
    LuClock,
    LuFilter,
    LuRefreshCw,
    LuChevronLeft,
    LuChevronRight,
} from 'react-icons/lu';
import Loading from '../../Components/Loading/Loading';
import { CgBell, CgEditStraight } from 'react-icons/cg';
import { formatDate } from '../../utils/formatDate';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyTuitions = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { getClassLabel } = useClassOptions();
    const { getSubjectLabel } = useSubjectOptions();
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['myTuitions', user?.email, filter, page],
        queryFn: async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('email', user?.email);
                queryParams.append('page', page);
                queryParams.append('limit', 10);

                if (filter && filter !== 'all') {
                    queryParams.append('status', filter);
                }
                console.log('Making request to:', `/tuitions/my-posts?${queryParams.toString()}`);

                const response = await axiosSecure.get(`/students/my-tuitions?${queryParams.toString()}`);
                console.log('Response:', response);
                return response.data;
            } catch (error) {
                console.log('Error in queryFn:', error);
                console.log('Error response:', error.response);
                throw error;
            }
        },
        enabled: !!user?.email
    });
    const handleFilterChange = (newFilter) => {
        if (newFilter !== filter) {
            setFilter(newFilter);
            setPage(1); // Reset to first page when filter changes
        }
    };
    const handleDelete = async (id) => {


        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm, delete"
        });
        if (result.isConfirmed) {
            setIsDeleting(true);
            try {
                const response = await axiosSecure.delete(`/tuitions/${id}?email=${user?.email}`);
                if (response.data.success) {
                    toast.success('Tuition deleted successfully');
                    refetch();
                }
            } catch (error) {
                toast.error(error.response?.data?.error || 'Failed to delete tuition');
            } finally {
                setIsDeleting(false);
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your post has been deleted.",
                icon: "success"
            });

        }
        // .then((result) => {
        //     if (result.isConfirmed) {

        //     }
        // });

    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: <span className="badge badge-warning badge-sm">Pending</span>,
            active: <span className="badge badge-success badge-sm">Active</span>,
            approved: <span className="badge badge-success badge-sm">Approved</span>,
            rejected: <span className="badge badge-error badge-sm">Rejected</span>,
            completed: <span className="badge badge-info badge-sm">Completed</span>,
            deleted: <span className="badge badge-ghost badge-sm">Deleted</span>
        };
        return badges[status] || <span className="badge badge-ghost badge-sm">{status}</span>;
    };


    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <CgBell className="text-4xl text-red-500" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            Failed to load tuitions
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

    const tuitions = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="min-h-scree py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-primary font-bold text-base-content">
                            My Tuition Posts
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your tuition posts and track applications
                        </p>
                    </div>
                    <Link
                        to="/dashboard/my-tuitions/post"
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                        <LuPlus className="text-lg" />
                        Post New Tuition
                    </Link>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        <LuFilter className="text-gray-400 flex-shrink-0" />
                        <div className="tabs tabs-boxed">
                            <button
                                onClick={() => {
                                    handleFilterChange("all")
                                }}
                                className={`tab tab-sm ${filter === 'all' ? 'tab-active' : ''}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange("pending")
                                }}
                                className={`tab tab-sm ${filter === 'pending' ? 'tab-active' : ''}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange("active")
                                }}
                                className={`tab tab-sm ${filter === 'active' ? 'tab-active' : ''}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange("approved")
                                }}
                                className={`tab tab-sm ${filter === 'approved' ? 'tab-active' : ''}`}
                            >
                                Approved
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange("rejected")
                                }}
                                className={`tab tab-sm ${filter === 'rejected' ? 'tab-active' : ''}`}
                            >
                                Rejected
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange("completed")
                                }}
                                className={`tab tab-sm ${filter === 'completed' ? 'tab-active' : ''}`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {tuitions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <LuUsers className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            No tuition posts found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all'
                                ? "You haven't posted any tuitions yet"
                                : `No ${filter} tuition posts found`}
                        </p>
                        <Link
                            to="/dashboard/my-tuitions/post"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <LuPlus />
                            Post Your First Tuition
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    {/* Head */}
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="font-primary font-bold text-base-content">Title</th>
                                            <th className="font-primary font-bold text-base-content">Subject</th>
                                            <th className="font-primary font-bold text-base-content">Class</th>
                                            <th className="font-primary font-bold text-base-content">Budget</th>
                                            <th className="font-primary font-bold text-base-content">Location</th>
                                            <th className="font-primary font-bold text-base-content">Posted</th>
                                            <th className="font-primary font-bold text-base-content">Status</th>
                                            <th className="font-primary font-bold text-base-content">Applicants</th>
                                            <th className="font-primary font-bold text-base-content text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tuitions.map((tuition) => (
                                            <tr key={tuition._id} className="hover">
                                                <td>
                                                    <div className="font-medium text-base-content">
                                                        {tuition.title}
                                                    </div>
                                                    {tuition.badge && (
                                                        <span className={`badge badge-${tuition.badgeColor} badge-xs mt-1`}>
                                                            {tuition.badge}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>{getSubjectLabel(tuition.subject)}</td>
                                                <td>{getClassLabel(tuition.class)}</td>
                                                <td>
                                                    <div className="font-medium">{tuition.minBudget} - {tuition.maxBudget}</div>
                                                    <div className="text-xs text-gray-500">{tuition.budgetType}/hr</div>
                                                </td>
                                                <td>
                                                    <div>{tuition.location}</div>
                                                    {tuition.area && (
                                                        <div className="text-xs text-gray-500">{tuition.area}</div>
                                                    )}
                                                </td>
                                                <td>{formatDate(tuition.posted)}</td>
                                                <td>{getStatusBadge(tuition.status)}</td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <LuUsers className="text-gray-400" />
                                                        <span className="font-medium">{tuition.applicants || 0}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => navigate(`/tuitions/${tuition._id}`)}
                                                            className="btn btn-circle btn-xs btn-ghost text-primary"
                                                            title="View"
                                                        >
                                                            <LuEye size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/dashboard/my-tuitions/edit/${tuition._id}`)}
                                                            className="btn btn-circle btn-xs btn-ghost text-primary"
                                                            title="Edit"
                                                        >

                                                            <FaRegEdit size={16} />

                                                        </button>
                                                        {tuition.status === "completed" ?
                                                            "" : <button
                                                                onClick={() => handleDelete(tuition._id, tuition.title)}
                                                                disabled={isDeleting}
                                                                className="btn btn-circle btn-xs btn-ghost text-error"
                                                                title="Delete"
                                                            >
                                                                <LuTrash2 size={16} />
                                                            </button>
                                                        }

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

export default MyTuitions;