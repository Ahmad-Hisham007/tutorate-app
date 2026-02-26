// src/Components/ScrollToTopButton/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;

            setScrollProgress(scrolled);


            if (winScroll > 300 || scrolled > 10) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Calculate circle properties
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-[1vh] z-50 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${showButton
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            {/* Progress Circle SVG */}
            <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
                {/* Background circle */}
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="#00C49F" // secondary color
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />
            </svg>

            {/* Arrow icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <FaArrowUp className="text-secondary text-lg" />
            </div>
        </button>
    );
};

export default ScrollToTopButton;