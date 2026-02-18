import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { LuMapPin, LuMessageCircleMore } from 'react-icons/lu';
import { MdLocalPhone } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight, FaUserGraduate } from 'react-icons/fa';
import useInitials from '../../Hooks/useInitials';

const TutorsCard = ({ tutor }) => {

    return (
        <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full">
            <div className="p-6 h-full flex flex-col">
                {/* Profile Header */}
                <div className="flex items-center flex-wrap gap-2 mb-6">
                    <div className="md:w-20 md:h-20 md:text-xl w-12 h-12 text-base rounded-full bg-linear-to-r from-primary/40 to-primary flex items-center justify-center text-white font-bold mr-4">
                        {useInitials(tutor.name)}
                    </div>
                    <div>
                        <h3 className="md:text-xl text-lg font-bold text-gray-800">
                            {tutor.name}
                        </h3>
                        <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400">
                                {'★'.repeat(Math.floor(tutor.rating))}
                                {tutor.rating % 1 !== 0 && '½'}
                            </div>
                            <span className="text-gray-600 text-sm font-medium ml-2">
                                {tutor.rating} ({tutor.totalReviews.toLocaleString()})
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1">
                            <LuMapPin /> {tutor.location}
                        </p>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Starting from:</span>
                        <span className="font-bold text-gray-800">
                            ${tutor.hourlyRate.toFixed(2)}/hr
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 mr-2">
                            <MdLocalPhone />
                        </span>
                        <span className="text-gray-700 text-sm font-medium">
                            {tutor.phone}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 mr-2">
                            <LuMessageCircleMore />
                        </span>
                        <span className="text-gray-700 text-sm font-medium">
                            {tutor.whatsapp}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 mr-2">
                            <FaUserGraduate />
                        </span>
                        <span className="text-gray-700 text-sm font-medium">
                            {tutor.qualifications}
                        </span>
                    </div>
                </div>

                {/* Specializations */}
                {/* <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-2">Specializes in:</p>
                    <div className="flex flex-wrap gap-2">
                        {tutor.specializations.map((spec, index) => (
                            <span
                                key={index}
                                className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                </div> */}

                {/* Availability */}
                <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-2">Availability:</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                            {tutor.availability.weekdays}
                        </p>
                        <p className="text-sm text-gray-700">
                            {tutor.availability.weekends}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                            Next available: {tutor.availability.nextAvailable}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-stretch gap-3 mt-auto">
                    <button className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                        <span>Contact now</span>
                        <IoChevronForwardOutline className='text-lg' />
                    </button>
                    <button className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300">
                        <span>View full profile</span>
                        <IoChevronForwardOutline className='text-lg' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorsCard;