// src/Pages/RevenueHistory/RevenueHistory.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LuDollarSign,
    LuBookOpen,
    LuUser,
    LuCalendar,
    LuChevronLeft,
    LuChevronRight,
    LuRefreshCw,
    LuTrendingUp,
    LuArrowDownLeft
} from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';
import { formatDateTime } from '../../utils/formatDateTime';
import Loading from '../../Components/Loading/Loading';

const RevenueHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['revenueHistory', user?.email, page],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('page', page);
            params.append('limit', 10);

            const response = await axiosSecure.get(`/payments/revenue-history?${params.toString()}`);
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
                            Failed to load revenue history
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

    const payments = data?.data || [];
    const summary = data?.summary || {};
    const pagination = data?.pagination;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content">
                        Revenue History
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Your earnings from completed tuitions
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <LuDollarSign className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-xl font-bold text-base-content">
                                    BDT {summary.totalEarnings?.toLocaleString() || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <LuBookOpen className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Completed Tuitions</p>
                                <p className="text-xl font-bold text-base-content">{summary.totalTransactions || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <LuUser className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Students</p>
                                <p className="text-xl font-bold text-base-content">
                                    {new Set(payments.map(p => p.studentDetails?._id)).size}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <LuTrendingUp className="text-amber-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Average per Tuition</p>
                                <p className="text-xl font-bold text-base-content">
                                    BDT {payments.length ? Math.round(summary.totalEarnings / payments.length) : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Table */}
                {payments.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <LuDollarSign className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                            No revenue yet
                        </h3>
                        <p className="text-gray-600">
                            You haven't received any payments yet
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="font-primary font-bold text-base-content">Date</th>
                                            <th className="font-primary font-bold text-base-content">Tuition</th>
                                            <th className="font-primary font-bold text-base-content">Student</th>
                                            <th className="font-primary font-bold text-base-content">Amount</th>
                                            <th className="font-primary font-bold text-base-content">Status</th>
                                            <th className="font-primary font-bold text-base-content">Transaction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment._id} className="hover">
                                                <td>{formatDateTime(payment.createdAt)}</td>
                                                <td>
                                                    <div className="font-medium">{payment.tuitionDetails?.title}</div>
                                                    <div className="text-xs text-gray-500">{payment.tuitionDetails?.subject}</div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={payment.studentDetails?.photoURL || `https://ui-avatars.com/api/?name=${payment.studentDetails?.name}`}
                                                            alt={payment.studentDetails?.name}
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <span>{payment.studentDetails?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="font-medium text-green-600">BDT {payment.amount}</td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <LuArrowDownLeft className="text-green-500" />
                                                        <span className="text-xs text-green-500">Received</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                                                        {payment.transactionId?.slice(-8)}...
                                                    </span>
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

export default RevenueHistory;