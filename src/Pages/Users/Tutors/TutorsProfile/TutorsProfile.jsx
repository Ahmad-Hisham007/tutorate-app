// TutorProfileSimple.jsx
import React, { useState } from 'react';
import { FaStar, FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router';
import BreadCrumbs from '../../../../Components/BreadCrumbs/BreadCrumbs';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../Hooks/useAxios';
import Loading from '../../../../Components/Loading/Loading';

const TutorProfileSimple = () => {
    const { id } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('introduction');
    const axios = useAxios();

    const { data: tutor, isLoading: isDataLoading } = useQuery({
        queryKey: ["tutor", id],
        queryFn: async () => {
            const { data } = await axios.get(`/tutors/${id}`);
            return data.data;
        }
    });

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'} />
        ));
    };

    // Helper functions for standard structure
    const getQualifications = () => {
        if (!tutor?.qualifications || !Array.isArray(tutor.qualifications)) return [];

        return tutor.qualifications.map(q =>
            `${q.degree || ''} from ${q.institution || ''} (${q.year || 'N/A'})`
        );
    };

    const getSubjects = () => {
        if (!tutor?.subjects || !Array.isArray(tutor.subjects)) return [];

        return tutor.subjects.map(s => s.value || s);
    };

    const getAvailability = () => {
        if (!tutor?.availability || Object.keys(tutor.availability).length === 0) {
            return { weekdays: 'Not specified', weekends: 'Not specified' };
        }

        return {
            weekdays: tutor.availability.weekdays || 'Not specified',
            weekends: tutor.availability.weekends || 'Not specified'
        };
    };

    if (isDataLoading) {
        return <Loading />;
    }

    if (!tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">Tutor not found</p>
            </div>
        );
    }

    const breadcrumbItems = [
        { title: "Tutors", path: "/tutors" },
        { title: tutor.name, path: location.pathname }
    ];

    const qualifications = getQualifications();
    const subjects = getSubjects();
    const availability = getAvailability();

    return (
        <div className="font-primary text-base-content bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-sm flex justify-start text-gray-500">
                        <BreadCrumbs items={breadcrumbItems} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Image */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                <img
                                    src={tutor.photoURL || 'https://via.placeholder.com/150'}
                                    alt={tutor.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                {tutor.isVerified && (
                                    <div className="absolute bottom-1 right-1 bg-primary rounded-full p-1">
                                        <FaCheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Tutor Info */}
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-primary font-bold mb-2">{tutor.name}</h1>

                                {/* Qualifications Tags */}
                                {qualifications.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {qualifications.map((qual, index) => (
                                            <span
                                                key={index}
                                                className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                                            >
                                                {qual}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Rating & Location */}
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {renderStars(tutor.rating || 0)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {tutor.rating?.toFixed(1) || '0.0'} ({tutor.totalReviews || 0} reviews)
                                        </span>
                                    </div>
                                    {tutor.location && (
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            <span className="text-sm">{tutor.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {tutor.phone && (
                                        <a
                                            href={`tel:${tutor.phone}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
                                        >
                                            <FaPhone /> Call
                                        </a>
                                    )}
                                    {tutor.email && (
                                        <a
                                            href={`mailto:${tutor.email}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-xl text-sm hover:bg-secondary/90 transition-colors"
                                        >
                                            <FaEnvelope /> Email
                                        </a>
                                    )}
                                    {tutor.whatsapp && (
                                        <a
                                            href={`https://wa.me/${tutor.whatsapp.replace(/^0+/, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600 transition-colors"
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex gap-6 px-6 border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('introduction')}
                            className={`py-3 font-medium border-b-2 transition-colors ${activeTab === 'introduction'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Introduction
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-3 font-medium border-b-2 transition-colors ${activeTab === 'reviews'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Reviews ({tutor.totalReviews || 0})
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'introduction' ? (
                            <div>
                                {/* Bio */}
                                {tutor.bio && (
                                    <>
                                        <h2 className="text-xl font-primary font-bold mb-4">About {tutor.name}</h2>
                                        <p className="text-gray-600 leading-relaxed mb-6">{tutor.bio}</p>
                                    </>
                                )}

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {tutor.experience && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaGraduationCap className="text-primary" />
                                                <span className="font-medium">Experience</span>
                                            </div>
                                            <p className="text-gray-600">{tutor.experience} years</p>
                                        </div>
                                    )}
                                    {tutor.expectedSalary && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium">Expected Salary</span>
                                            </div>
                                            <p className="text-gray-600">৳ {tutor.expectedSalary}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Subjects */}
                                {subjects.length > 0 && (
                                    <>
                                        <h3 className="font-primary font-bold mb-3">Subjects</h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {subjects.map((subject, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                                >
                                                    {subject.replace(/-/g, ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Availability */}
                                <h3 className="font-primary font-bold mb-3">Availability</h3>
                                <div className="bg-primary/5 p-4 rounded-xl">
                                    <p className="text-gray-600">Weekdays: {availability.weekdays}</p>
                                    <p className="text-gray-600">Weekends: {availability.weekends}</p>
                                </div>
                            </div>
                        ) : (
                            // Reviews Tab
                            <div className="text-center py-8">
                                {tutor.totalReviews > 0 ? (
                                    <div>Reviews coming soon...</div>
                                ) : (
                                    <p className="text-gray-500">No reviews yet</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileSimple;