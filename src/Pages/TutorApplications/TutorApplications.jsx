import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { LuUsers, LuBookOpen, LuClock, LuDollarSign, LuMapPin, LuCheck, LuX, LuFilter } from 'react-icons/lu';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import { formatDate } from '../../utils/formatDate';
import { Link, useNavigate } from 'react-router';

const TutorApplications = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [selectedTuition, setSelectedTuition] = useState('');
    const navigate = useNavigate();

    // 1. Fetch student's all tuitions
    const { data: tuitionsData, isLoading: tuitionsLoading, refetch: refetchTuitions } = useQuery({
        queryKey: ['myTuitions', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/students/my-tuitions?email=${user?.email}&limit=100`);
            return response.data.data;
        },
        enabled: !!user?.email
    });

    // 2. Fetch applications for selected tuition
    const { data: applicationsData, isLoading: appsLoading, refetch } = useQuery({
        queryKey: ['tutorApplications', user?.email, selectedTuition],
        queryFn: async () => {
            if (!selectedTuition) return { data: [] };
            const response = await axiosSecure.get(
                `/student/tuitions/${selectedTuition}/applications?email=${user?.email}` // 👈 updated path
            );
            return response.data;
        },
        enabled: !!user?.email && !!selectedTuition
    });

    // console.log(applicationsData, selectedTuition, selectedTuitionObj)
    const handleAction = async (applicationId, action) => {
        try {
            const response = await axiosSecure.patch(
                `/applications/${applicationId}/${action}?email=${user?.email}`
            );

            if (response.data.success) {
                if (action === 'approve') {
                    const selectedTuitionObj = tuitions?.find(t => t._id === selectedTuition);
                    toast.success('Proceeding to payment...');
                    navigate('/dashboard/checkout', {
                        state: {
                            applicationId,
                            amount: response.data.data.amount,
                            tuitionTitle: selectedTuitionObj?.title || 'Tuition Payment',
                        }
                    });
                } else {
                    toast.success('Application rejected');
                    refetchTuitions();
                    refetch();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Action failed');
        }
    };

    if (tuitionsLoading) return <Loading />;

    const tuitions = tuitionsData || [];
    const applications = applicationsData?.data || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-primary font-bold text-base-content">
                        Tutor Applications
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Review and manage applications for your tuition posts
                    </p>
                </div>

                {/* Tuition Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <label className="block text-sm font-medium text-base-content mb-2">
                        <LuFilter className="inline mr-2" />
                        Select Tuition Post
                    </label>
                    <select
                        value={selectedTuition}
                        onChange={(e) => setSelectedTuition(e.target.value)}
                        className="select select-bordered w-full max-w-md"
                    >
                        <option value="">Choose a tuition...</option>
                        {tuitions.map(tuition => (
                            <option key={tuition._id} value={tuition._id}>
                                {tuition.title} - {tuition.subject} ({tuition.applicants || 0} applicants)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Applications List */}
                {selectedTuition && (
                    <>
                        {appsLoading ? (
                            <Loading />
                        ) : applications.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <LuUsers className="text-4xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-primary font-bold text-base-content mb-2">
                                    No applications yet
                                </h3>
                                <p className="text-gray-600">
                                    No tutors have applied to this tuition post
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div key={app._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Tutor Info */}
                                            <div className="flex items-start flex-wrap md:flex-nowrap gap-4 flex-1">
                                                <Link className='block' to={`/tutors/${app.tutorId}`} target='_blank'>
                                                    <img
                                                        src={app.tutorPhoto || `https://ui-avatars.com/api/?name=${app.tutorName}`}
                                                        alt={app.tutorName}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                </Link>

                                                <div>
                                                    <Link className='block' to={`/tutors/${app.tutorId}`} target='_blank'>
                                                        <h3 className="text-lg font-primary font-bold text-base-content">
                                                            {app.tutorName}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-sm text-gray-600">{app.tutorEmail}</p>
                                                </div>
                                            </div>

                                            {/* Application Details */}
                                            <div className="flex-1">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="font-medium text-gray-500">Qualifications:</span>
                                                        <p className="text-base-content">{app.qualifications}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-500">Experience:</span>
                                                        <p className="text-base-content">{app.experience} years</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-500">Expected Salary:</span>
                                                        <p className="text-base-content font-medium text-primary">
                                                            {app.expectedSalary} BDT
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-500">Applied:</span>
                                                        <p className="text-base-content">{formatDate(app.appliedAt)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    onClick={() => handleAction(app._id, 'approve')}
                                                    className="btn btn-sm btn-success gap-2"
                                                >
                                                    <LuCheck size={16} />
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleAction(app._id, 'reject')}
                                                    className="btn btn-sm btn-error gap-2"
                                                >
                                                    <LuX size={16} />
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TutorApplications;