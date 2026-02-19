// TuitionJobDetails.jsx
import React, { useState } from 'react';
import {
    FaMapMarkerAlt,
    FaClock,
    FaMoneyBillWave,
    FaUsers,
    FaGraduationCap,
    FaBookOpen,
    FaCalendarAlt,
    FaBriefcase,
    FaLaptop,
    FaBuilding,
    FaShareAlt,
    FaBookmark,
    FaFlag,
    FaChevronRight,
    FaCheckCircle,
    FaExclamationCircle,
    FaStar,
    FaRegStar
} from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

const TuitionsSingle = () => {
    // const { id } = useParams();
    const [activeTab, setActiveTab] = useState('details');
    const [isSaved, setIsSaved] = useState(false);

    // Tuition job data based on the provided fields
    const tuitionJob = {
        "_id": "6996bc64e608082ae59e56a0",
        "title": "Mathematics Tutor for High School",
        "institution": "Lincoln High School",
        "location": "Boston, MA",
        "type": "Part-time",
        "mode": "Hybrid",
        "budget": "$45-60/hr",
        "students": "Grade 9-12",
        "subject": "Calculus & Algebra",
        "posted": "2 days ago",
        "applicants": 12,
        "slots": 2,
        "badge": "FEATURED",
        "badgeColor": "primary",
        // Additional fields for comprehensive details
        "description": "Lincoln High School is seeking an enthusiastic and experienced Mathematics Tutor to join our academic support team. The ideal candidate will have a strong background in calculus and algebra, with the ability to engage high school students and help them excel in their mathematical studies.",
        "responsibilities": [
            "Conduct one-on-one and small group tutoring sessions for students in grades 9-12",
            "Develop personalized lesson plans based on student needs and curriculum requirements",
            "Assist students with homework, test preparation, and concept reinforcement",
            "Track student progress and provide regular feedback to parents and teachers",
            "Prepare teaching materials and resources for effective learning",
            "Maintain a positive and encouraging learning environment"
        ],
        "requirements": [
            "Bachelor's degree in Mathematics, Education, or related field (Master's preferred)",
            "Minimum 2 years of teaching or tutoring experience at high school level",
            "Strong knowledge of calculus, algebra, and advanced mathematics",
            "Excellent communication and interpersonal skills",
            "Patience and ability to explain complex concepts in simple terms",
            "Teaching certification is a plus"
        ],
        "qualifications": [
            "Experience with hybrid/online teaching platforms",
            "Familiarity with high school curriculum standards",
            "Background check required",
            "CPR/First Aid certification preferred"
        ],
        "schedule": {
            "days": "Monday to Friday",
            "hours": "3:00 PM - 6:00 PM",
            "flexible": true,
            "startDate": "September 1, 2024",
            "duration": "Academic Year 2024-2025"
        },
        "benefits": [
            "Competitive hourly rate ($45-60/hr based on experience)",
            "Flexible scheduling options",
            "Professional development opportunities",
            "Access to school facilities and resources",
            "Potential for full-time position",
            "Paid training sessions"
        ],
        "instructor": {
            "name": "Dr. Sarah Johnson",
            "title": "Department Head, Mathematics",
            "email": "sarah.johnson@lincolnhigh.edu",
            "phone": "(617) 555-0123",
            "avatar": "https://i.pravatar.cc/150?img=8"
        },
        "schoolInfo": {
            "established": "1975",
            "type": "Public High School",
            "students": "1,200+",
            "website": "www.lincolnhigh.edu",
            "rating": 4.5,
            "accreditation": "New England Association of Schools and Colleges"
        },
        "applicationDeadline": "August 15, 2024",
        "startDate": "September 1, 2024",
        "experience": "2+ years",
        "education": "Bachelor's Degree Minimum"
    };

    // Similar jobs
    const similarJobs = [
        {
            "_id": "1",
            "title": "Science Tutor (Physics & Chemistry)",
            "institution": "Riverside Academy",
            "location": "Cambridge, MA",
            "type": "Part-time",
            "budget": "$40-55/hr",
            "badge": "NEW",
            "badgeColor": "secondary",
            "posted": "1 day ago"
        },
        {
            "_id": "2",
            "title": "English Literature Tutor",
            "institution": "Boston Public Schools",
            "location": "Boston, MA",
            "type": "Full-time",
            "budget": "$50-65/hr",
            "badge": "URGENT",
            "badgeColor": "accent",
            "posted": "3 days ago"
        },
        {
            "_id": "3",
            "title": "Computer Science Tutor",
            "institution": "Tech High School",
            "location": "Somerville, MA",
            "type": "Contract",
            "budget": "$55-70/hr",
            "badge": "HOT",
            "badgeColor": "primary",
            "posted": "5 days ago"
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="w-4 h-4 text-amber-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="font-primary text-base-content bg-gradient-to-b from-gray-50 to-white min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <a href="/" className="hover:text-primary transition-colors">Home</a>
                        <FaChevronRight className="mx-2 w-3 h-3" />
                        <a href="/tuition-jobs" className="hover:text-primary transition-colors">Tuition Jobs</a>
                        <FaChevronRight className="mx-2 w-3 h-3" />
                        <span className="text-base-content font-medium">{tuitionJob.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                            {/* Badge and Save Button */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-4 py-2 bg-${tuitionJob.badgeColor}/10 text-${tuitionJob.badgeColor} rounded-full text-sm font-bold`}>
                                    {tuitionJob.badge}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsSaved(!isSaved)}
                                        className={`p-2 rounded-xl transition-all ${isSaved
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                    >
                                        <FaBookmark className={isSaved ? 'fill-current' : ''} />
                                    </button>
                                    <button className="p-2 bg-gray-100 rounded-xl text-gray-500 hover:bg-gray-200 transition-all">
                                        <FaShareAlt />
                                    </button>
                                    <button className="p-2 bg-gray-100 rounded-xl text-gray-500 hover:bg-gray-200 transition-all">
                                        <FaFlag />
                                    </button>
                                </div>
                            </div>

                            {/* Title and Institution */}
                            <h1 className="text-3xl lg:text-4xl font-primary font-bold text-base-content mb-2">
                                {tuitionJob.title}
                            </h1>
                            <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                                <FaBuilding className="text-primary" />
                                <span>{tuitionJob.institution}</span>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 text-primary mb-1">
                                        <FaMapMarkerAlt className="w-4 h-4" />
                                        <span className="text-sm font-medium">Location</span>
                                    </div>
                                    <p className="font-semibold">{tuitionJob.location}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 text-secondary mb-1">
                                        <FaClock className="w-4 h-4" />
                                        <span className="text-sm font-medium">Type</span>
                                    </div>
                                    <p className="font-semibold">{tuitionJob.type}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 text-accent mb-1">
                                        <FaLaptop className="w-4 h-4" />
                                        <span className="text-sm font-medium">Mode</span>
                                    </div>
                                    <p className="font-semibold">{tuitionJob.mode}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 text-green-600 mb-1">
                                        <FaMoneyBillWave className="w-4 h-4" />
                                        <span className="text-sm font-medium">Budget</span>
                                    </div>
                                    <p className="font-semibold">{tuitionJob.budget}</p>
                                </div>
                            </div>

                            {/* Additional Info Row */}
                            <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaGraduationCap className="text-primary" />
                                    <span>{tuitionJob.students}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaBookOpen className="text-secondary" />
                                    <span>{tuitionJob.subject}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaUsers className="text-accent" />
                                    <span>{tuitionJob.applicants} applicants • {tuitionJob.slots} slots</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>Posted {tuitionJob.posted}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-200 px-6">
                                <div className="flex gap-6">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`py-4 font-medium border-b-2 transition-colors ${activeTab === 'details'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Job Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('requirements')}
                                        className={`py-4 font-medium border-b-2 transition-colors ${activeTab === 'requirements'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Requirements
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('school')}
                                        className={`py-4 font-medium border-b-2 transition-colors ${activeTab === 'school'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        School Info
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {activeTab === 'details' && (
                                    <div className="space-y-6">
                                        {/* Description */}
                                        <div>
                                            <h3 className="text-xl font-primary font-bold mb-3">Job Description</h3>
                                            <p className="text-gray-600 leading-relaxed">{tuitionJob.description}</p>
                                        </div>

                                        {/* Responsibilities */}
                                        <div>
                                            <h3 className="text-xl font-primary font-bold mb-3">Responsibilities</h3>
                                            <ul className="space-y-2">
                                                {tuitionJob.responsibilities.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-gray-600">
                                                        <FaCheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Schedule */}
                                        <div className="bg-primary/5 rounded-xl p-5">
                                            <h3 className="text-xl font-primary font-bold mb-3">Schedule & Duration</h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Days</p>
                                                    <p className="font-medium">{tuitionJob.schedule.days}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Hours</p>
                                                    <p className="font-medium">{tuitionJob.schedule.hours}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                                                    <p className="font-medium">{tuitionJob.schedule.startDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                                                    <p className="font-medium">{tuitionJob.schedule.duration}</p>
                                                </div>
                                            </div>
                                            {tuitionJob.schedule.flexible && (
                                                <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
                                                    <FaCheckCircle className="w-4 h-4" />
                                                    Flexible scheduling available
                                                </p>
                                            )}
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <h3 className="text-xl font-primary font-bold mb-3">Benefits</h3>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {tuitionJob.benefits.map((benefit, index) => (
                                                    <div key={index} className="flex items-start gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                                                        <span className="text-gray-600">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'requirements' && (
                                    <div className="space-y-6">
                                        {/* Requirements */}
                                        <div>
                                            <h3 className="text-xl font-primary font-bold mb-3">Minimum Requirements</h3>
                                            <ul className="space-y-3">
                                                {tuitionJob.requirements.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                                                        <span className="text-gray-600">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Preferred Qualifications */}
                                        <div>
                                            <h3 className="text-xl font-primary font-bold mb-3">Preferred Qualifications</h3>
                                            <ul className="space-y-3">
                                                {tuitionJob.qualifications.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2"></span>
                                                        <span className="text-gray-600">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Education & Experience */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Education Required</p>
                                                <p className="font-medium text-lg">{tuitionJob.education}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Experience Required</p>
                                                <p className="font-medium text-lg">{tuitionJob.experience}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'school' && (
                                    <div className="space-y-6">
                                        {/* School Info */}
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-xl font-primary font-bold mb-4">About {tuitionJob.institution}</h3>
                                                <div className="space-y-3">
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">Established:</span>
                                                        <span className="font-medium">{tuitionJob.schoolInfo.established}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">School Type:</span>
                                                        <span className="font-medium">{tuitionJob.schoolInfo.type}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">Total Students:</span>
                                                        <span className="font-medium">{tuitionJob.schoolInfo.students}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">Accreditation:</span>
                                                        <span className="font-medium">{tuitionJob.schoolInfo.accreditation}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">Website:</span>
                                                        <a href={`https://${tuitionJob.schoolInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                            {tuitionJob.schoolInfo.website}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-gray-50 rounded-xl p-5">
                                                    <h4 className="font-primary font-bold mb-3">School Rating</h4>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex gap-1">
                                                            {renderStars(tuitionJob.schoolInfo.rating)}
                                                        </div>
                                                        <span className="font-medium">{tuitionJob.schoolInfo.rating}/5.0</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">Based on parent and student reviews</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Application Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-5">
                            <h3 className="text-xl font-primary font-bold mb-4">Apply for this position</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Applications</span>
                                    <span className="font-medium">{tuitionJob.applicants} applicants</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Available Slots</span>
                                    <span className="font-medium text-green-600">{tuitionJob.slots} positions</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Application Deadline</span>
                                    <span className="font-medium">{tuitionJob.applicationDeadline}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Expected Start</span>
                                    <span className="font-medium">{tuitionJob.startDate}</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white font-primary font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all transform hover:scale-[1.02] mb-3">
                                Apply Now
                            </button>

                            <button className="w-full border-2 border-primary text-primary font-primary font-bold py-4 px-6 rounded-xl hover:bg-primary/5 transition-all">
                                Save for Later
                            </button>

                            {/* Contact Person */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-primary font-bold mb-3">Contact Person</h4>
                                <div className="flex items-center gap-3">
                                    <img src={tuitionJob.instructor.avatar} alt={tuitionJob.instructor.name} className="w-12 h-12 rounded-xl" />
                                    <div>
                                        <p className="font-medium">{tuitionJob.instructor.name}</p>
                                        <p className="text-sm text-gray-500">{tuitionJob.instructor.title}</p>
                                        <p className="text-sm text-primary mt-1">{tuitionJob.instructor.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Similar Jobs */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-primary font-bold mb-4">Similar Jobs</h3>
                            <div className="space-y-4">
                                {similarJobs.map((job) => (
                                    <a
                                        key={job._id}
                                        href={`/tuition-jobs/${job._id}`}
                                        className="block p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-primary font-bold group-hover:text-primary transition-colors">
                                                {job.title}
                                            </h4>
                                            <span className={`text-xs px-2 py-1 bg-${job.badgeColor}/10 text-${job.badgeColor} rounded-full`}>
                                                {job.badge}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{job.institution}</p>
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="w-3 h-3" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaClock className="w-3 h-3" /> {job.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaMoneyBillWave className="w-3 h-3" /> {job.budget}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Posted {job.posted}</p>
                                    </a>
                                ))}
                            </div>

                            <button className="w-full text-center text-primary font-medium mt-4 hover:underline">
                                View All Similar Jobs
                            </button>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                            <h3 className="font-primary font-bold mb-3 flex items-center gap-2">
                                <FaExclamationCircle className="text-primary" />
                                Application Tips
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                                    Tailor your resume to highlight math teaching experience
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                                    Include any teaching certifications or credentials
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                                    Prepare a brief teaching demo or portfolio
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary mt-2"></span>
                                    Apply before the deadline for best consideration
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionsSingle;