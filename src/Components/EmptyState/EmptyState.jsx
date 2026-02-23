// src/Components/Errors/EmptyState.jsx
import React from 'react';
import { LuPackage, LuPlus, LuSearch } from 'react-icons/lu';
import Lottie from 'lottie-react';
// You'll need to download an empty state animation from LottieFiles
import emptyAnimation from '../../assets/animations/empty.json';
import { Link } from 'react-router';

const EmptyState = ({
    type = 'tuitions', // 'tuitions' or 'tutors'
    message,
    actionLink,
    actionText
}) => {
    const defaultMessages = {
        tuitions: {
            title: 'No Tuitions Found',
            description: "We couldn't find any tuition posts matching your criteria. Try adjusting your filters or check back later.",
            action: 'Browse All Tuitions',
            link: '/tuitions'
        },
        tutors: {
            title: 'No Tutors Found',
            description: "We couldn't find any tutors matching your criteria. Try adjusting your filters or check back later.",
            action: 'Browse All Tutors',
            link: '/tutors'
        }
    };

    const content = defaultMessages[type];

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-6">
            <div className="text-center max-w-2xl mx-auto">
                {/* Lottie Animation */}
                <div className="w-48 h-48 mx-auto mb-6">
                    <Lottie animationData={emptyAnimation} loop={true} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-primary font-bold text-base-content mb-3">
                    {message?.title || content.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    {message?.description || content.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={actionLink || content.link}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <LuSearch className="text-lg" />
                        {actionText || content.action}
                    </Link>
                    {type === 'tuitions' && (
                        <Link
                            to="/dashboard/my-tuitions/post"
                            className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                        >
                            <LuPlus className="text-lg" />
                            Post a Tuition
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmptyState;