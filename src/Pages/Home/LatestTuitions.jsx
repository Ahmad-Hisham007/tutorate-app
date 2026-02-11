import React from 'react';

const LatestTuitions = () => {
    const tuitionListings = [
        {
            id: 1,
            title: "Mathematics Tutor for High School",
            institution: "Lincoln High School",
            location: "Boston, MA",
            type: "Part-time",
            mode: "Hybrid",
            budget: "$45-60/hr",
            students: "Grade 9-12",
            subject: "Calculus & Algebra",
            posted: "2 days ago",
            applicants: 12,
            slots: 2,
            badge: "FEATURED",
            badgeColor: "primary"
        },
        {
            id: 2,
            title: "Physics & Chemistry Teacher",
            institution: "Summit Academy",
            location: "Austin, TX",
            type: "Full-time",
            mode: "On-site",
            budget: "$65-80/hr",
            students: "Grade 11-12",
            subject: "AP Physics, Chemistry",
            posted: "5 hours ago",
            applicants: 8,
            slots: 1,
            badge: "URGENT",
            badgeColor: "secondary"
        },
        {
            id: 3,
            title: "English Literature Tutor",
            institution: "Riverside School",
            location: "Portland, OR",
            type: "Contract",
            mode: "Online",
            budget: "$40-55/hr",
            students: "Middle School",
            subject: "Creative Writing, Grammar",
            posted: "1 day ago",
            applicants: 15,
            slots: 3,
            badge: "NEW",
            badgeColor: "accent"
        },
        {
            id: 4,
            title: "Computer Science Instructor",
            institution: "Tech Valley High",
            location: "San Jose, CA",
            type: "Part-time",
            mode: "Remote",
            budget: "$70-90/hr",
            students: "High School",
            subject: "Python, Web Dev",
            posted: "3 days ago",
            applicants: 9,
            slots: 2,
            badge: "HIRING",
            badgeColor: "primary"
        },
        {
            id: 5,
            title: "Biology & Life Sciences",
            institution: "Greenwood Academy",
            location: "Raleigh, NC",
            type: "Full-time",
            mode: "Hybrid",
            budget: "$50-65/hr",
            students: "Grade 9-10",
            subject: "AP Biology, Ecology",
            posted: "6 hours ago",
            applicants: 6,
            slots: 1,
            badge: "URGENT",
            badgeColor: "secondary"
        },
        {
            id: 6,
            title: "Spanish Language Teacher",
            institution: "Global Learning Center",
            location: "Miami, FL",
            type: "Contract",
            mode: "Online",
            budget: "$35-50/hr",
            students: "All Levels",
            subject: "Conversational Spanish",
            posted: "4 days ago",
            applicants: 21,
            slots: 4,
            badge: "FLEXIBLE",
            badgeColor: "accent"
        },
        {
            id: 7,
            title: "History & Social Studies",
            institution: "Heritage School",
            location: "Philadelphia, PA",
            type: "Part-time",
            mode: "On-site",
            budget: "$40-55/hr",
            students: "Grade 6-8",
            subject: "World History, Civics",
            posted: "1 week ago",
            applicants: 5,
            slots: 2,
            badge: "FEATURED",
            badgeColor: "primary"
        },
        {
            id: 8,
            title: "Art & Design Mentor",
            institution: "Creative Arts Institute",
            location: "Chicago, IL",
            type: "Freelance",
            mode: "Hybrid",
            budget: "$30-45/hr",
            students: "High School",
            subject: "Drawing, Digital Art",
            posted: "2 days ago",
            applicants: 18,
            slots: 3,
            badge: "NEW",
            badgeColor: "accent"
        }
    ];

    const badgeStyles = {
        primary: "bg-primary/10 text-primary border-primary/20",
        secondary: "bg-secondary/20 text-secondary border-secondary/30",
        accent: "bg-accent/20 text-accent border-accent/30"
    };

    return (
        <section className="py-16 lg:py-24 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                        Featured <span className="text-primary">Tuitions</span>
                    </h2>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Find the perfect teaching opportunity that matches your expertise and schedule
                    </p>
                </div>

                {/* Tuition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tuitionListings.map((tuition) => (
                        <div
                            key={tuition.id}
                            className="group bg-base-100 rounded-lg border border-base-content/10 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Image Placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-cyan-300/20 to-amber-200/20 flex items-center justify-center overflow-hidden">
                                {/* Dummy Image/Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id={`grid-${tuition.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M0 20 L40 20 M20 0 L20 40" stroke="currentColor" strokeWidth="0.5" className="text-base-content/20" />
                                            </pattern>
                                        </defs>
                                        <rect x="0" y="0" width="100%" height="100%" fill={`url(#grid-${tuition.id})`} />
                                    </svg>
                                </div>

                                {/* Centered Icon */}
                                <div className="relative z-10">
                                    <div className="w-20 h-20 rounded-full bg-base-100/80 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/50">
                                        <span className="font-primary text-3xl font-bold text-primary">
                                            {tuition.institution.charAt(0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles[tuition.badgeColor]}`}>
                                    {tuition.badge}
                                </div>

                                {/* Posted Time */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-base-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-base-content/70 border border-base-content/10">
                                    {tuition.posted}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Title & Institution */}
                                <div className="mb-4">
                                    <h3 className="font-primary text-lg font-bold text-base-content mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                        {tuition.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-base-content/70">{tuition.institution}</span>
                                        <span className="w-1 h-1 rounded-full bg-base-content/30"></span>
                                        <span className="text-base-content/70">{tuition.location}</span>
                                    </div>
                                </div>

                                {/* Key Details Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-base-content/50">Type</span>
                                        <span className="text-sm font-medium text-base-content">{tuition.type}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-base-content/50">Mode</span>
                                        <span className="text-sm font-medium text-base-content">{tuition.mode}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-base-content/50">Budget</span>
                                        <span className="text-sm font-bold text-primary">{tuition.budget}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-base-content/50">Students</span>
                                        <span className="text-sm font-medium text-base-content">{tuition.students}</span>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="mb-4">
                                    <span className="text-xs text-base-content/50 block mb-1">Subject</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-cyan-300/10 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">
                                            {tuition.subject}
                                        </span>
                                    </div>
                                </div>

                                {/* Applicants & Slots */}
                                <div className="flex items-center justify-between py-3 border-t border-base-content/10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-base-content/70">
                                            {tuition.applicants} applicants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                        <span className="text-xs text-base-content/70">
                                            {tuition.slots} {tuition.slots > 1 ? 'slots' : 'slot'} left
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">
                                    <button className="flex-1 bg-primary text-base-100 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                                        Apply Now
                                    </button>
                                    <button className="px-4 py-2.5 border border-base-content/20 rounded-lg font-medium text-sm text-base-content hover:bg-base-content/5 transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 font-primary font-semibold text-primary hover:text-primary/80 transition-colors group"
                    >
                        <span>Explore all tuition listings</span>
                        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <p className="text-sm text-base-content/50 mt-2">
                        48+ active tuition opportunities available
                    </p>
                </div>
            </div>
        </section>

    );
};

export default LatestTuitions;