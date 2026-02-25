// src/Pages/Reports/Reports.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LuDollarSign,
    LuUsers,
    LuBookOpen,
    LuFileText,
    LuTrendingUp,
    LuCalendar,
    LuDownload,
    LuRefreshCw,
    LuChevronLeft,
    LuChevronRight
} from 'react-icons/lu';
import { CgBell } from 'react-icons/cg';
import { IoStatsChartSharp } from 'react-icons/io5';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Area, AreaChart
} from 'recharts';
import { formatDate } from '../../utils/formatDate';
import { formatDateTime } from '../../utils/formatDateTime';
import Loading from '../../Components/Loading/Loading';
import NotFound from '../../Components/NotFound/NotFound';
import Forbidden from '../../Components/ForbiddenError/ForbiddenError';
import ServerError from '../../Components/ServerError/ServerError';

const Reports = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [dateRange, setDateRange] = useState('month'); // week, month, year
    const [transactionPage, setTransactionPage] = useState(1);

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['adminReports', user?.email, dateRange, transactionPage],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('email', user?.email);
            params.append('range', dateRange);
            params.append('page', transactionPage);
            params.append('limit', 10);

            const response = await axiosSecure.get(`/admin/reports?${params.toString()}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <Loading />;

    if (isError) {
        if (error?.response?.status === 403) return <Forbidden />;
        if (error?.response?.status === 404) return <NotFound />;
        return <ServerError error={error} />;
    }

    const stats = data?.stats || {};
    const chartData = data?.chartData || [];
    const roleDistribution = data?.roleDistribution || [];
    const recentTransactions = data?.recentTransactions || [];
    const transactionPagination = data?.transactionPagination || {};

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content flex items-center gap-2">
                        <IoStatsChartSharp className="text-primary" />
                        Platform Reports & Analytics
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Monitor platform performance and financial data
                    </p>
                </div>

                {/* Date Range Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <LuCalendar className="text-gray-400" />
                        <div className="btn-group">
                            <button
                                onClick={() => setDateRange('week')}
                                className={`btn btn-sm ${dateRange === 'week' ? 'btn-active' : ''}`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setDateRange('month')}
                                className={`btn btn-sm ${dateRange === 'month' ? 'btn-active' : ''}`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setDateRange('year')}
                                className={`btn btn-sm ${dateRange === 'year' ? 'btn-active' : ''}`}
                            >
                                Year
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-base-content mt-1">
                                    BDT {stats.totalEarnings?.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-green-600 mt-2">
                                    +{stats.earningsGrowth || 0}% from last period
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <LuDollarSign className="text-green-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-base-content mt-1">
                                    {stats.totalUsers || 0}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {stats.activeUsers || 0} active
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <LuUsers className="text-blue-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Tuitions</p>
                                <p className="text-2xl font-bold text-base-content mt-1">
                                    {stats.totalTuitions || 0}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {stats.activeTuitions || 0} active
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <LuBookOpen className="text-purple-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Applications</p>
                                <p className="text-2xl font-bold text-base-content mt-1">
                                    {stats.totalApplications || 0}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {stats.pendingApplications || 0} pending
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <LuFileText className="text-amber-600 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Earnings Trend */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-primary font-bold text-base-content mb-4">
                            Earnings Trend
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="earnings"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        name="Earnings (BDT)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* User Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-primary font-bold text-base-content mb-4">
                            User Distribution by Role
                        </h3>
                        <div className="h-80 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={roleDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {roleDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-primary font-bold text-base-content">
                            Recent Transactions
                        </h3>
                        <button className="btn btn-sm btn-ghost gap-2">
                            <LuDownload size={16} />
                            Export
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="font-primary font-bold text-base-content">Date</th>
                                    <th className="font-primary font-bold text-base-content">Student</th>
                                    <th className="font-primary font-bold text-base-content">Tutor</th>
                                    <th className="font-primary font-bold text-base-content">Tuition</th>
                                    <th className="font-primary font-bold text-base-content">Amount</th>
                                    <th className="font-primary font-bold text-base-content">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx._id} className="hover">
                                        <td>{formatDateTime(tx.createdAt)}</td>
                                        <td>{tx.studentName}</td>
                                        <td>{tx.tutorName}</td>
                                        <td>{tx.tuitionTitle}</td>
                                        <td className="font-medium text-primary">BDT {tx.amount}</td>
                                        <td>
                                            <span className="badge badge-success badge-sm">Completed</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {transactionPagination?.pages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button
                                onClick={() => setTransactionPage(p => Math.max(1, p - 1))}
                                disabled={transactionPage === 1}
                                className="btn btn-outline btn-sm"
                            >
                                <LuChevronLeft />
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {transactionPage} of {transactionPagination.pages}
                            </span>
                            <button
                                onClick={() => setTransactionPage(p => Math.min(transactionPagination.pages, p + 1))}
                                disabled={transactionPage === transactionPagination.pages}
                                className="btn btn-outline btn-sm"
                            >
                                Next
                                <LuChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;