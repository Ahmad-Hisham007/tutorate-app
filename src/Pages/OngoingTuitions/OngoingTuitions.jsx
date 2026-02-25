// src/Pages/OngoingTuitions/OngoingTuitions.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LuBookOpen,
    LuClock,
    LuDollarSign,
    LuMapPin,
    LuUser,
    LuPhone,
    LuMail,
    LuChevronLeft,
    LuChevronRight,
    LuRefreshCw
} from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';
import { formatDate } from '../../utils/formatDate';
import Loading from '../../Components/Loading/Loading';

const OngoingTuitions = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['ongoingTuitions', user?.email, page],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('page', page);
            params.append('limit', 10);

            const response = await axiosSecure.get(`/tutor/tuitions/ongoing?${params.toString()}`);
            return response.data;
        },
        enabled: !!user?.email
    });

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
                            Failed to load ongoing tuitions
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content">
                        Ongoing Tuitions
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Your currently active teaching assignments
                    </p>
                </div>

                {/* Tuitions List */}
                {tuitions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <LuBookOpen className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            No ongoing tuitions
                        </h3>
                        <p className="text-gray-600">
                            You don't have any active teaching assignments yet
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {tuitions.map((tuition) => (
                                <div
                                    key={tuition._id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Tuition Details */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-primary font-bold text-base-content mb-3">
                                                {tuition.title}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <LuBookOpen className="text-primary" />
                                                    <span>{tuition.subject}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <LuClock className="text-primary" />
                                                    <span>{tuition.schedule?.days}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <LuDollarSign className="text-primary" />
                                                    <span>{tuition.minBudget} - {tuition.maxBudget} BDT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <LuMapPin className="text-primary" />
                                                    <span>{tuition.location}</span>
                                                </div>
                                            </div>

                                            {/* Student Information */}
                                            {tuition.studentDetails && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <h4 className="font-medium text-base-content mb-3 flex items-center gap-2">
                                                        <LuUser className="text-primary" />
                                                        Student Information
                                                    </h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        <div className="text-sm">
                                                            <span className="text-gray-500">Name:</span>
                                                            <p className="font-medium">{tuition.studentDetails.name}</p>
                                                        </div>
                                                        <div className="text-sm">
                                                            <span className="text-gray-500">Email:</span>
                                                            <p className="font-medium wrap-break-word">{tuition.studentDetails.email}</p>
                                                        </div>
                                                        {tuition.studentDetails.phone && (
                                                            <div className="text-sm">
                                                                <span className="text-gray-500">Phone:</span>
                                                                <p className="font-medium">{tuition.studentDetails.phone}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Status Badge */}
                                        <div className="lg:w-32 flex gap-4 flex-wrap lg:flex-col items-stretch lg:items-end justify-between">
                                            <span className="text-sm text-gray-500 mt-2 block w-full">
                                                Started: {formatDate(tuition.updatedAt)}
                                            </span>
                                            <span className="badge badge-success badge-lg block w-full text-center">Ongoing</span>

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
    );
};

export default OngoingTuitions;