import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LuUser,
    LuMail,
    LuPhone,
    LuMapPin,
    LuBookOpen,
    LuClock,
    LuAward,
    LuDollarSign,
    LuCalendar,
    // LuCheckCircle,
    // LuXCircle,
    LuBriefcase,
    LuGraduationCap,
    LuMessageSquare,
    LuStar,
    LuUsers,
    LuFileText,
    LuCreditCard,
    LuCheckCheck
} from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';
import { FaEnvelopeCircleCheck, FaEnvelopeOpen } from 'react-icons/fa6';
import useSubjectOptions from '../../Hooks/useSubjectOptions';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('overview');
    const { getSubjectLabel } = useSubjectOptions();
    // Fetch profile data
    const { data: profileData, isLoading: profileLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get('/users/profile', {
                params: {
                    email: user?.email
                }
            });
            return response.data.data;
        },
        enabled: !!user
    });

    // Fetch user statistics
    const { data: statsData, isLoading: statsLoading } = useQuery({
        queryKey: ['userStats', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get('/users/stats');
            return response.data.data;
        },
        enabled: !!user
    });

    // Fetch recent activity
    const { data: activityData, isLoading: activityLoading } = useQuery({
        queryKey: ['userActivity', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get('/users/activity', {
                params: {
                    email: user?.email,
                    limit: 5
                }
            });
            return response.data.data;
        },
        enabled: !!user
    });

    if (profileLoading) {
        return <Loading />;
    }

    const profile = profileData;

    // Stats cards based on user role
    const getStatsCards = () => {
        if (profile?.role === 'tutor') {
            return [
                {
                    icon: <LuFileText className="text-2xl" />,
                    label: 'Applications',
                    value: statsData?.applications || 0,
                    color: 'bg-blue-100 text-primary'
                },
                {
                    icon: <LuCheckCheck className="text-2xl" />,
                    label: 'Accepted',
                    value: statsData?.acceptedApplications || 0,
                    color: 'bg-green-100 text-green-600'
                },
                {
                    icon: <LuBriefcase className="text-2xl" />,
                    label: 'Ongoing',
                    value: statsData?.ongoingTuitions || 0,
                    color: 'bg-amber-100 text-secondary'
                },
                {
                    icon: <LuDollarSign className="text-2xl" />,
                    label: 'Earnings',
                    value: `$${statsData?.totalEarnings || 0}`,
                    color: 'bg-purple-100 text-purple-600'
                }
            ];
        } else {
            return [
                {
                    icon: <LuBookOpen className="text-2xl" />,
                    label: 'Total Tuitions',
                    value: statsData?.totalTuitions || 0,
                    color: 'bg-blue-100 text-primary'
                },
                {
                    icon: <LuBriefcase className="text-2xl" />,
                    label: 'Active',
                    value: statsData?.activeTuitions || 0,
                    color: 'bg-green-100 text-green-600'
                },
                {
                    icon: <LuUsers className="text-2xl" />,
                    label: 'Applications',
                    value: statsData?.totalApplications || 0,
                    color: 'bg-amber-100 text-secondary'
                },
                {
                    icon: <LuCreditCard className="text-2xl" />,
                    label: 'Spent',
                    value: `$${statsData?.totalPayments || 0}`,
                    color: 'bg-purple-100 text-purple-600'
                }
            ];
        }
    };

    return (
        <div className="min-h-scree py-8">
            <div className="container mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Picture */}
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <img
                                    src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.name}&background=random`}
                                    alt={profile?.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                                <h1 className="text-3xl font-primary font-bold text-base-content">
                                    {profile?.name}
                                </h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit mx-auto md:mx-0 ${profile?.role === 'tutor' ? 'bg-blue-100 text-primary' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {profile?.role === 'tutor' ? <LuBriefcase /> : <LuGraduationCap />}
                                    {profile?.role === 'tutor' ? 'Tutor' : 'Student'}
                                </span>
                                {profile?.isVerified && (
                                    <span className="bg-cyan-100 text-cyan-600 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit mx-auto md:mx-0">
                                        {/* <LuCheckCircle /> */}
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="max-w-110 flex flex-wrap gap-4 mt-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FaEnvelopeOpen className="text-primary" />
                                    <span>{profile?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <LuPhone className="text-primary" />
                                    <span>{profile?.phone || 'Not provided'}</span>
                                </div>
                                {profile?.location && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <LuMapPin className="text-primary" />
                                        <span>{profile.location}</span>
                                    </div>
                                )}
                                {profile?.whatsapp && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <FaWhatsapp className="text-green-500" />
                                        <span>{profile.whatsapp}</span>
                                    </div>
                                )}
                                {/* Status as badge next to name */}
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${profile?.status === 'active'
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                    }`}>
                                    <span>
                                        Account status:
                                    </span>
                                    <span className={`w-2 h-2 rounded-full ${profile?.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                    {profile?.status === 'active' ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Link
                                to="/dashboard/profile-settings"
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                {!statsLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {getStatsCards().map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold font-primary text-base-content">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Main Content Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'overview'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-base-content'
                                    }`}
                            >
                                Overview
                            </button>
                            {profile?.role === 'tutor' && (
                                <>
                                    <button
                                        onClick={() => setActiveTab('qualifications')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'qualifications'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-600 hover:text-base-content'
                                            }`}
                                    >
                                        Qualifications
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('subjects')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'subjects'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-600 hover:text-base-content'
                                            }`}
                                    >
                                        Subjects
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('availability')}
                                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'availability'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-600 hover:text-base-content'
                                            }`}
                                    >
                                        Availability
                                    </button>
                                </>
                            )}
                            {profile?.role === 'student' && (
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'preferences'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-600 hover:text-base-content'
                                        }`}
                                >
                                    Preferences
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'activity'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-base-content'
                                    }`}
                            >
                                Recent Activity
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Bio */}
                                {profile?.bio && (
                                    <div>
                                        <h3 className="text-lg font-primary font-bold text-base-content mb-3">About</h3>
                                        <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                                    </div>
                                )}

                                {/* Basic Info Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-primary font-bold text-base-content mb-3">Basic Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <LuCalendar className="text-primary" />
                                                <span>Member since: {new Date(profile?.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            {profile?.role === 'tutor' && (
                                                <>
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <LuClock className="text-primary" />
                                                        <span>Experience: {profile?.experience || 0} years</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <LuDollarSign className="text-primary" />
                                                        <span>Hourly Rate: ${profile?.hourlyRate || 0}/hour</span>
                                                    </div>
                                                    {profile?.rating > 0 && (
                                                        <div className="flex items-center gap-3 text-gray-600">
                                                            <LuStar className="text-yellow-400" />
                                                            <span>Rating: {profile?.rating} ({profile?.totalReviews} reviews)</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subjects Summary */}
                                    {profile?.subjects?.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-primary font-bold text-base-content mb-3">Subjects</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.subjects.slice(0, 5).map((subject, index) => (
                                                    <span key={index} className="px-3 py-1 bg-blue-50 text-primary rounded-full text-sm">
                                                        {subject.label || subject.value || subject}
                                                    </span>
                                                ))}
                                                {profile.subjects.length > 5 && (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                        +{profile.subjects.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Qualifications Tab (Tutor only) */}
                        {activeTab === 'qualifications' && profile?.role === 'tutor' && (
                            <div>
                                <h3 className="text-lg font-primary font-bold text-base-content mb-4">Qualifications & Education</h3>
                                {profile?.qualifications?.length > 0 ? (
                                    <div className="space-y-4">
                                        {profile.qualifications.map((qual, index) => (
                                            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <LuAward className="text-xl" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-base-content">{qual.degree}</h4>
                                                    <p className="text-gray-600">{qual.institution}</p>
                                                    <p className="text-sm text-gray-500">{qual.year}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No qualifications added yet</p>
                                )}
                            </div>
                        )}

                        {/* Subjects Tab (Tutor only) */}
                        {activeTab === 'subjects' && profile?.role === 'tutor' && (
                            <div>
                                {profile?.subjects?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-primary font-bold text-base-content mb-3">Subjects</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.subjects.slice(0, 5).map((subject, index) => (
                                                <span key={index} className="px-3 py-1 bg-blue-50 text-primary rounded-full text-sm">
                                                    {subject.label || subject.value || subject}
                                                </span>
                                            ))}
                                            {profile.subjects.length > 5 && (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                    +{profile.subjects.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Preferences Tab (Student only) */}
                        {activeTab === 'preferences' && profile?.role === 'student' && (
                            <div>
                                <h3 className="text-lg font-primary font-bold text-base-content mb-4">Learning Preferences</h3>
                                <div className="space-y-4">
                                    {profile?.class && (
                                        <div className="flex items-center gap-3">
                                            <LuGraduationCap className="text-primary text-xl" />
                                            <span className="text-gray-600">Class: <span className="font-medium text-base-content">{profile.class}</span></span>
                                        </div>
                                    )}
                                    {profile?.preferredSubjects?.length > 0 && (
                                        <div>
                                            <p className="text-gray-600 mb-2">Preferred Subjects:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.preferredSubjects.map((subject, index) => (
                                                    <span key={index} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                                                        {getSubjectLabel(subject.value || subject)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Activity Tab */}
                        {activeTab === 'activity' && (
                            <div>
                                <h3 className="text-lg font-primary font-bold text-base-content mb-4">Recent Activity</h3>
                                {activityLoading ? (
                                    <div className="text-center py-8">Loading...</div>
                                ) : activityData?.length > 0 ? (
                                    <div className="space-y-4">
                                        {activityData.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'application' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-primary'
                                                    }`}>
                                                    {item.type === 'application' ? <LuFileText /> : <LuBookOpen />}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-base-content">{item.title}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {item.subject} - {item.class}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-600'
                                                    : item.status === 'accepted'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic text-center py-8">No recent activity</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;