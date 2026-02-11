import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import InteractiveDash from "../../assets/interactive-dashboard.jpg"

// Icons - replace with your actual icons
import {
    LuUsers,
    LuShieldCheck,
    LuCreditCard,
    LuStar,
    LuThumbsUp,
    LuHeadphones,
    LuClock,
    LuMessageSquare
} from 'react-icons/lu';


import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WhyChooseUs = () => {
    const [activeTab, setActiveTab] = useState('process');

    const features = [
        {
            id: 'process',
            title: 'User friendly hiring process',
            description: 'Our streamlined platform makes finding and hiring the perfect tutor effortless. From search to scheduling, we\'ve optimized every step for maximum convenience.',
            icon: <LuUsers className="text-3xl" />,
            details: [
                'Easy tutor search with advanced filters',
                'One-click booking system',
                'Real-time availability tracking',
                'Automated scheduling and reminders'
            ]
        },
        {
            id: 'verified',
            title: 'Verified process with ease',
            description: 'Every tutor undergoes rigorous verification including background checks, qualification validation, and teaching certification confirmation.',
            icon: <LuShieldCheck className="text-3xl" />,
            details: [
                'Background check verified',
                'Qualification documents verified',
                'Teaching certification confirmed',
                'Student reviews authenticated'
            ]
        },
        {
            id: 'payment',
            title: 'Secure payment gateway integrated',
            description: 'Enjoy worry-free transactions with our bank-level secure payment system. Multiple payment options with complete transparency and protection.',
            icon: <LuCreditCard className="text-3xl" />,
            details: [
                '256-bit SSL encryption',
                'Multiple payment methods',
                'Secure escrow system',
                'Money-back guarantee'
            ]
        },
        {
            id: 'support',
            title: '24/7 dedicated support',
            description: 'Round-the-clock customer support to ensure seamless learning experiences. Get help whenever you need it.',
            icon: <LuHeadphones className="text-3xl" />,
            details: [
                '24/7 chat and phone support',
                'Dedicated relationship manager',
                'Quick issue resolution',
                'Regular progress check-ins'
            ]
        }
    ];

    const stats = [
        { value: '98%', label: 'Student Satisfaction', icon: <LuStar /> },
        { value: '10K+', label: 'Verified Tutors', icon: <LuThumbsUp /> },
        { value: '24/7', label: 'Support Available', icon: <LuClock /> },
        { value: '50K+', label: 'Successful Sessions', icon: <LuMessageSquare /> }
    ];
    return (
        <section className="py-16 lg:py-24 bg-linear-to-b text-base-content from-white to-gray-50">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-primary md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                        Why our working is so <span className="text-primary">unique</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how our working process easily adapt to your needs
                    </p>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                    {/* Left Column - Features */}
                    <div className='px-4'>
                        {/* Feature Tabs */}
                        <div className="space-y-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${activeTab === feature.id
                                        ? 'border-primary bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-cyan-300 hover:shadow-md'
                                        }`}
                                    onClick={() => setActiveTab(feature.id)}
                                >
                                    <div className="flex md:flex-row flex-col md:items-start items-center gap-4">
                                        <div className={`p-3 rounded-lg ${activeTab === feature.id
                                            ? 'bg-blue-100 text-primary'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl text-center font-bold text-base-content mb-2 font-primary">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {feature.description}
                                            </p>

                                            {/* Details List */}
                                            <ul className="space-y-2">
                                                {feature.details.map((detail, index) => (
                                                    <li key={index} className="flex items-center text-base-content">
                                                        <span className={`w-2 h-2 rounded-full mr-3 ${activeTab === feature.id
                                                            ? 'bg-primary'
                                                            : 'bg-gray-400'
                                                            }`}></span>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Section */}
                        <div className="md:mt-12 mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4">
                                    <div className="flex justify-center items-center mb-2">
                                        <div className="text-primary mr-2">{stat.icon}</div>
                                        <div className="text-3xl font-bold font-primary text-base-content">{stat.value}</div>
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image/Visualization */}
                    <div className='relative h-full'>
                        {/* Main Image/Illustration */}
                        <div className=" sticky top-5 bg-linear-to-br from-accent to-amber-100 rounded-2xl md:p-8 p-4 shadow-xl md:overflow-x-visible overflow-x-clip">

                            <div className='md:relative'>
                                <img src={InteractiveDash} alt="Interactive Dashboard" className='rounded-2xl' />

                                {/* Feature Cards Slider */}
                                <div className="mt-8">
                                    <h4 className="text-xl font-bold font-primary text-base-content mb-6">
                                        How It Works
                                    </h4>

                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={{
                                            nextEl: '.how-it-works-next',
                                            prevEl: '.how-it-works-prev',
                                        }}
                                        spaceBetween={20}
                                        slidesPerView={1.2}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            768: {
                                                slidesPerView: 2.5,
                                                spaceBetween: 20,
                                            },
                                        }}
                                        className="rounded-lg"
                                    >
                                        {[
                                            { step: '01', title: 'Find Tutor', desc: 'Search & filter' },
                                            { step: '02', title: 'Book Session', desc: 'Choose time slot' },
                                            { step: '03', title: 'Learn Live', desc: 'Interactive class' },
                                            { step: '04', title: 'Track Progress', desc: 'Monitor growth' },
                                        ].map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                                    <div className="text-primary font-bold text-lg mb-2">
                                                        {item.step}
                                                    </div>
                                                    <h5 className="font-bold text-base-content mb-1">
                                                        {item.title}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Slider Navigation */}
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button className="how-it-works-prev w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
                                            <FaChevronLeft></FaChevronLeft>
                                        </button>
                                        <button className="how-it-works-next w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
                                            <FaChevronRight></FaChevronRight>
                                        </button>
                                    </div>
                                </div>


                            </div>
                            <div className="absolute -top-16 -left-16 w-24 h-24 bg-linear-to-r from-amber-400 to-orange-500 rounded-2xl rotate-12 opacity-20 -z-1"></div>
                            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-linear-to-r from-green-400 to-teal-500 rounded-3xl -rotate-12 opacity-20 -z-2"></div>
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-20 bg-linear-to-r from-amber-200 to-secondary rounded-2xl p-8 text-base-content">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-4xl mb-4">"</div>
                        <p className="text-xl mb-6">
                            The platform made finding the perfect tutor for my child incredibly simple.
                            The verification process gave us confidence, and the payment system was seamless.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full"></div>
                            <div className="text-left">
                                <h4 className="font-bold">Sarah Johnson</h4>
                                <p className="text-base-content">Parent of 2 students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;