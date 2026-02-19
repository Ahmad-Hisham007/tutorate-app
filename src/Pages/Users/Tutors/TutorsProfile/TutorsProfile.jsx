// TutorProfileSimple.jsx
import React, { useState } from 'react';
import { FaStar, FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router';
import BreadCrumbs from '../../../../Components/BreadCrumbs/BreadCrumbs';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../Hooks/useAxios';
import Loading from '../../../../Components/Loading/Loading';

const tutors = [
    {
        "_id": "699590a820d4b6e5269c8efd",
        "name": "Shamima Yasmin",
        "email": "shamima.yasmin@example.com",
        "phone": "01998765432",
        "role": "tutor",
        "photoURL": "https://i.pravatar.cc/400?img=8",
        "status": "active",
        "createdAt": "2026-02-18T10:12:55.996Z",
        "qualifications": "M.Sc in Zoology (Dhaka University)",
        "experience": 12,
        "subjects": ["Biology", "Zoology", "Human Anatomy"],
        "bio": "Senior biology teacher with DU degree. On the other hand, we denounce with rigor and indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.",
        "hourlyRate": 800,
        "location": "Mirpur, Dhaka",
        "rating": 5,
        "totalReviews": 2345,
        "availability": {
            "weekdays": "Sun-Thu: 3 PM - 8 PM",
            "weekends": "Friday: 9 AM - 1 PM"
        },
        "whatsapp": "01998765432",
        "isVerified": true
    }
];

const TutorProfileSimple = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('introduction');

    const axios = useAxios();

    const { data: tutor,
        isLoading: isDataLoading
    } = useQuery({
        queryKey: ["tutor", id],
        queryFn: async () => {
            const { data } = await axios.get(`/tutors/${id}`);
            return data.data;
        }
    });
    console.log(id, tutor)
    // For demo, using first tutor
    // const tutor = tutors[0];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < rating ? 'text-amber-400' : 'text-gray-300'} />
        ));
    };



    if (isDataLoading) {
        return <Loading></Loading>
    }

    const breadcrumbItems = [
        { title: "tutors", path: "/tutors" },
        { title: tutor.name, path: location.pathname }
    ];
    return (
        <div className="font-primary text-base-content bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-sm flex justify-start text-gray-500">
                        <BreadCrumbs items={breadcrumbItems}></BreadCrumbs>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={tutor.photoURL} alt={tutor.name} className="w-full h-full object-cover" />
                                {tutor.isVerified && (
                                    <div className="absolute bottom-1 right-1 bg-primary rounded-full p-1">
                                        <FaCheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-primary font-bold mb-2">{tutor.name}</h1>
                                <p className="text-gray-600 mb-3">{tutor.qualifications}</p>

                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {renderStars(tutor.rating)}
                                        </div>
                                        <span className="text-sm text-gray-600">{tutor.rating} ({tutor.totalReviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <FaMapMarkerAlt className="text-gray-400" />
                                        <span className="text-sm">{tutor.location}</span>
                                    </div>
                                </div>

                                {/* Contact Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <a href={`tel:${tutor.phone}`} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90">
                                        <FaPhone /> Call
                                    </a>
                                    <a href={`mailto:${tutor.email}`} className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-xl text-sm hover:bg-secondary/90">
                                        <FaEnvelope /> Email
                                    </a>
                                    <a href={`https://wa.me/${tutor.whatsapp}`} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600">
                                        <FaWhatsapp /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 px-6 border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('introduction')}
                            className={`py-3 font-medium border-b-2 ${activeTab === 'introduction' ? 'border-primary text-primary' : 'border-transparent text-gray-500'
                                }`}
                        >
                            Introduction
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-3 font-medium border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500'
                                }`}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {activeTab === 'introduction' ? (
                            <div>
                                <h2 className="text-xl font-primary font-bold mb-4">About {tutor.name}</h2>
                                <p className="text-gray-600 leading-relaxed mb-6">{tutor.bio}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaGraduationCap className="text-primary" />
                                            <span className="font-medium">Experience</span>
                                        </div>
                                        <p className="text-gray-600">{tutor.experience} years</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaMapMarkerAlt className="text-primary" />
                                            <span className="font-medium">Location</span>
                                        </div>
                                        <p className="text-gray-600">{tutor.location}</p>
                                    </div>
                                </div>

                                <h3 className="font-primary font-bold mb-3">Subjects</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tutor.subjects.map((subject, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                            {subject}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="font-primary font-bold mb-3">Availability</h3>
                                <div className="bg-primary/5 p-4 rounded-xl">
                                    <p className="text-gray-600">{tutor.availability.weekdays}</p>
                                    <p className="text-gray-600">{tutor.availability.weekends}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">No reviews yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileSimple;