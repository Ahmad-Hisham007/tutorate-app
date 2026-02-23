// src/Components/Errors/Forbidden.jsx
import React from 'react';
import { LuLock, LuArrowLeft } from 'react-icons/lu';
import Lottie from 'lottie-react';
// You'll need to download a lock/forbidden animation from LottieFiles
import forbiddenAnimation from '../../assets/animations/forbidden.json';
import { Link } from 'react-router';
import { RiHomeLine } from 'react-icons/ri';

const Forbidden = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
            <div className="text-center max-w-2xl mx-auto">
                {/* Lottie Animation */}
                <div className="w-64 h-64 mx-auto mb-8">
                    <Lottie animationData={forbiddenAnimation} loop={true} />
                </div>

                {/* Error Code */}
                <h1 className="text-8xl font-primary font-bold text-primary mb-4">403</h1>

                {/* Title */}
                <h2 className="text-3xl font-primary font-bold text-base-content mb-4">
                    Access Forbidden
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-8 text-lg">
                    Sorry, you don't have permission to access this page.
                    This area is restricted to authorized users only.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <RiHomeLine className="text-lg" />
                        Go to Homepage
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <LuArrowLeft className="text-lg" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;