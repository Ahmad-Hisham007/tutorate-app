import React from 'react';
import { Link } from 'react-router';

const TuitionCard = ({ tuition }) => {
    const {
        _id,
        title,
        institution,
        location,
        type,
        mode,
        budget,
        students,
        subject,
        posted,
        applicants,
        slots,
        // badge,
        // badgeColor
    } = tuition;
    return (
        <div
            key={_id}
            className="group bg-base-100 rounded-lg border border-base-content/10 hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 grid-rows-[auto_1fr]"
        >

            <Link to={`/tuitions/${tuition._id}`}>
                {/* Image Placeholder */}
                <div className="relative bg-linear-to-br from-cyan-300/20 to-amber-200/20 flex items-center justify-center overflow-hidden min-h-48">
                    {/* Dummy Image/Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id={`grid-${_id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M0 20 L40 20 M20 0 L20 40" stroke="currentColor" strokeWidth="0.5" className="text-base-content/20" />
                                </pattern>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill={`url(#grid-${_id})`} />
                        </svg>
                    </div>

                    {/* Centered Icon */}
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-full bg-base-100/80 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/50">
                            <span className="font-primary text-3xl font-bold text-primary">
                                {institution.charAt(0)}
                            </span>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border text-secondary`}>
                        {slots}
                    </div>

                    {/* Posted Time */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-base-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-base-content/70 border border-base-content/10">
                        {posted}
                    </div>
                </div>
            </Link>



            {/* Content */}
            <div className="p-5 flex flex-col">
                {/* Title & Institution */}
                <div className="mb-4">

                    <Link to={`/tuitions/${tuition._id}`}>
                        <h3 className="font-primary text-lg font-bold text-base-content mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-base-content/70">{institution}</span>
                        <span className="w-1 h-1 rounded-full bg-base-content/30"></span>
                        <span className="text-base-content/70">{location}</span>
                    </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-base-content/50">Type</span>
                        <span className="text-sm font-medium text-base-content">{type}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-base-content/50">Mode</span>
                        <span className="text-sm font-medium text-base-content">{mode}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-base-content/50">Budget</span>
                        <span className="text-sm font-bold text-primary">{budget}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-base-content/50">Students</span>
                        <span className="text-sm font-medium text-base-content">{students}</span>
                    </div>
                </div>

                {/* Subject */}
                <div className="mb-4">
                    <span className="text-xs text-base-content/50 block mb-1">Subject</span>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-cyan-300/10 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">
                            {subject}
                        </span>
                    </div>
                </div>

                {/* Applicants & Slots */}
                <div className="flex items-center justify-between py-3 border-t border-base-content/10">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-base-content/70">
                            {applicants} applicants
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="text-xs text-base-content/70">
                            {slots} {slots > 1 ? 'slots' : 'slot'} left
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-primary text-base-100 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                        Apply Now
                    </button>
                    <Link to={`/tuitions/${tuition._id}`} className="px-4 py-2.5 border border-base-content/20 rounded-lg font-medium text-sm text-base-content hover:bg-base-content/5 transition-colors">
                        Details
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default TuitionCard;