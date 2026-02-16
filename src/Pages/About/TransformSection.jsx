import React, { useState } from 'react';
import { FaChartLine, FaChevronLeft, FaChevronRight, FaGraduationCap, FaTrophy, FaUsers } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TransformSection = () => {
    const [activeTab, setActiveTab] = useState(1);

    const features = [
        {
            id: 1,
            icon: <FaGraduationCap className="w-6 h-6" />,
            title: "Quality Education",
            description: "Experience world-class education with our expert instructors and comprehensive curriculum.",
            details: [
                "Expert instructors from top universities",
                "Comprehensive learning materials",
                "Interactive live sessions",
                "24/7 learning support"
            ]
        },
        {
            id: 2,
            icon: <FaTrophy className="w-6 h-6" />,
            title: "Recognized Excellence",
            description: "Join thousands of successful students who have transformed their careers with us.",
            details: [
                "Industry-recognized certifications",
                "90% post-graduation success rate",
                "Top-ranked programs nationwide",
                "Global alumni network"
            ]
        },
        {
            id: 3,
            icon: <FaChartLine className="w-6 h-6" />,
            title: "Flexible Learning",
            description: "Learn at your own pace with our flexible scheduling and diverse course offerings.",
            details: [
                "Self-paced learning options",
                "Live and recorded sessions",
                "Mobile-friendly platform",
                "Personalized learning paths"
            ]
        }
    ];

    const stats = [
        { icon: <FaUsers />, value: "20,000+", label: "Active Students" },
        { icon: <FaGraduationCap />, value: "16k+", label: "Graduates" },
        { icon: <FaTrophy />, value: "300+", label: "Expert Trainers" },
        { icon: <FaChartLine />, value: "95%", label: "Success Rate" }
    ];

    const trainers = [
        { name: "Francis Roman", role: "Marketing", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Francis Roman", role: "Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Francis Roman", role: "Marketing", image: "https://images.unsplash.com/photo-1494790108777-286d9e5b5b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" }
    ];
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-primary font-bold text-base-content mb-4">
                        Transform Your Life Through <span className="text-primary">Online Education</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Here are some opportunities with the best companies the market today. Join our Network and we can work together to find you what fits you.
                    </p>
                </div>

                {/* Trainers Section */}
                <div className="mb-16">
                    <h3 className="text-2xl font-primary font-bold mb-8">Trainers</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {trainers.map((trainer, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-4 overflow-hidden rounded-2xl">
                                    <img
                                        src={trainer.image}
                                        alt={trainer.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="text-xl font-primary font-bold">{trainer.name}</h4>
                                <p className="text-gray-600">{trainer.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <div className="space-y-6">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${activeTab === feature.id
                                        ? 'border-primary bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-cyan-300 hover:shadow-md'
                                        }`}
                                    onClick={() => setActiveTab(feature.id)}
                                >
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className={`p-3 rounded-lg ${activeTab === feature.id
                                            ? 'bg-blue-100 text-primary'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 mb-4">{feature.description}</p>
                                            <ul className="space-y-2">
                                                {feature.details.map((detail, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <span className={`w-2 h-2 rounded-full mr-3 ${activeTab === feature.id ? 'bg-primary' : 'bg-gray-400'
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
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4">
                                    <div className="flex justify-center items-center mb-2">
                                        <div className="text-primary mr-2">{stat.icon}</div>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Interactive Section */}
                    <div className="relative h-full">
                        <div className="sticky top-5 bg-gradient-to-br from-accent to-amber-100 rounded-2xl p-8 shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Interactive Dashboard"
                                className="rounded-2xl shadow-lg"
                            />

                            <div className="mt-8">
                                <h4 className="text-xl font-bold mb-6">How It Works</h4>

                                <Swiper
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.how-it-works-next',
                                        prevEl: '.how-it-works-prev',
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1.2}
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 20 },
                                        768: { slidesPerView: 2.5, spaceBetween: 20 },
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
                                                <div className="text-primary font-bold text-lg mb-2">{item.step}</div>
                                                <h5 className="font-bold mb-1">{item.title}</h5>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button className="how-it-works-prev w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <FaChevronLeft />
                                    </button>
                                    <button className="how-it-works-next w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransformSection;