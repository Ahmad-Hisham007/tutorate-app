// src/Components/Errors/ServerError.jsx
import React from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import Lottie from 'lottie-react';
// You'll need to download a server error animation from LottieFiles
import serverErrorAnimation from '../../assets/animations/server-error.json';
import { Link } from 'react-router';
import { RiHomeLine } from 'react-icons/ri';

const ServerError = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
            <div className="text-center max-w-2xl mx-auto">
                {/* Lottie Animation */}
                <div className="w-64 h-64 mx-auto mb-8">
                    <Lottie animationData={serverErrorAnimation} loop={true} />
                </div>

                {/* Error Code */}
                <h1 className="text-8xl font-primary font-bold text-accent mb-4">500</h1>

                {/* Title */}
                <h2 className="text-3xl font-primary font-bold text-base-content mb-4">
                    Server Error
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-8 text-lg">
                    Something went wrong on our end. We're working to fix it.
                    Please try again in a few moments.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleRefresh}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <LuRefreshCw className="text-lg" />
                        Try Again
                    </button>
                    <Link
                        to="/"
                        className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <RiHomeLine className="text-lg" />
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServerError;