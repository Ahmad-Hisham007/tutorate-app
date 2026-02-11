import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import { IoChevronForwardOutline } from 'react-icons/io5';
import { LuMapPin, LuMessageCircleMore } from 'react-icons/lu';
import { MdLocalPhone } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight, FaUserGraduate } from 'react-icons/fa';
import pattern from "../../assets/pattren.svg"

const TopInstructors = () => {
    return (
        <section className='relative top-instructors after:absolute after:top-0 after:right-0 after:w-9/12 after:content-[""] after:-z-1 after:bg-slate-50 after:rounded-t-[10px] after:rounded-b-[10px] after:h-full py-25 overflow-x-hidden'>
            <img src={pattern} alt="pattern" className='absolute left-1/12 top-1/12' />
            <div className='max-w-325 mx-auto relative px-5 lg:px-0'>
                <h1 className='text-[24px] md:text-[32px] font-bold font-primary leading-normal max-w-137.5'>Explore our top <span className='text-primary'>#tutors</span> with quality</h1>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                        // When window width is >= 640px (tablet)
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // When window width is >= 1024px (desktop)
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        }
                    }}
                    className='mt-10'
                >
                    <SwiperSlide>
                        <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="p-6 h-full flex flex-col">
                                {/* Badge and Image */}

                                <div className="flex items-center flex-wrap gap-2 mb-6">
                                    <div className="md:w-20 md:h-20 md:text-xl w-12 h-12 text-base rounded-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white  font-bold mr-4">
                                        DG
                                    </div>
                                    <div>
                                        <h3 className="md:text-xl text-lg font-bold text-gray-800">Dwayne Garrett</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex text-yellow-400">
                                                ★★★★★
                                            </div>
                                            <span className="text-gray-600 text-sm font-medium ml-2">5.0 (66,951)</span>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1"><LuMapPin /> Arlington, TN</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Starting from:</span>
                                        <span className="font-bold text-gray-800">$893.30/hr</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><MdLocalPhone /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><LuMessageCircleMore /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 987-6543</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><FaUserGraduate /></span>
                                        <span className="text-gray-700 text-sm font-medium">B.Tech in Mechanical Engineering</span>
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Specializes in:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Calculus</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Physics</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">SAT Math</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Availability:</p>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">Mon-Fri: 4 PM - 9 PM</p>
                                        <p className="text-sm text-gray-700">Weekends: 9 AM - 6 PM</p>
                                        <p className="text-xs text-green-600 mt-1">Next available: Tomorrow</p>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex flex-col items-stretch gap-3 mt-auto">
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                                        <span>Contact now</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2  items-center justify-between py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300">
                                        <span>View full profile</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="p-6 h-full flex flex-col">
                                {/* Badge and Image */}

                                <div className="flex items-center flex-wrap gap-2 mb-6">
                                    <div className="md:w-20 md:h-20 md:text-xl w-12 h-12 text-base rounded-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white  font-bold mr-4">
                                        DG
                                    </div>
                                    <div>
                                        <h3 className="md:text-xl text-lg font-bold text-gray-800">Dwayne Garrett</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex text-yellow-400">
                                                ★★★★★
                                            </div>
                                            <span className="text-gray-600 text-sm font-medium ml-2">5.0 (66,951)</span>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1"><LuMapPin /> Arlington, TN</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Starting from:</span>
                                        <span className="font-bold text-gray-800">$893.30/hr</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><MdLocalPhone /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><LuMessageCircleMore /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 987-6543</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><FaUserGraduate /></span>
                                        <span className="text-gray-700 text-sm font-medium">B.Tech in Mechanical Engineering</span>
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Specializes in:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Calculus</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Physics</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">SAT Math</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Availability:</p>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">Mon-Fri: 4 PM - 9 PM</p>
                                        <p className="text-sm text-gray-700">Weekends: 9 AM - 6 PM</p>
                                        <p className="text-xs text-green-600 mt-1">Next available: Tomorrow</p>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex flex-col items-stretch gap-3 mt-auto">
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                                        <span>Contact now</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2  items-center justify-between py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300">
                                        <span>View full profile</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="p-6 h-full flex flex-col">
                                {/* Badge and Image */}

                                <div className="flex items-center flex-wrap gap-2 mb-6">
                                    <div className="md:w-20 md:h-20 md:text-xl w-12 h-12 text-base rounded-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white  font-bold mr-4">
                                        DG
                                    </div>
                                    <div>
                                        <h3 className="md:text-xl text-lg font-bold text-gray-800">Dwayne Garrett</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex text-yellow-400">
                                                ★★★★★
                                            </div>
                                            <span className="text-gray-600 text-sm font-medium ml-2">5.0 (66,951)</span>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1"><LuMapPin /> Arlington, TN</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Starting from:</span>
                                        <span className="font-bold text-gray-800">$893.30/hr</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><MdLocalPhone /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><LuMessageCircleMore /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 987-6543</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><FaUserGraduate /></span>
                                        <span className="text-gray-700 text-sm font-medium">B.Tech in Mechanical Engineering</span>
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Specializes in:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Calculus</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Physics</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">SAT Math</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Availability:</p>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">Mon-Fri: 4 PM - 9 PM</p>
                                        <p className="text-sm text-gray-700">Weekends: 9 AM - 6 PM</p>
                                        <p className="text-xs text-green-600 mt-1">Next available: Tomorrow</p>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex flex-col items-stretch gap-3 mt-auto">
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                                        <span>Contact now</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2  items-center justify-between py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300">
                                        <span>View full profile</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="p-6 h-full flex flex-col">
                                {/* Badge and Image */}

                                <div className="flex items-center flex-wrap gap-2 mb-6">
                                    <div className="md:w-20 md:h-20 md:text-xl w-12 h-12 text-base rounded-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white  font-bold mr-4">
                                        DG
                                    </div>
                                    <div>
                                        <h3 className="md:text-xl text-lg font-bold text-gray-800">Dwayne Garrett</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex text-yellow-400">
                                                ★★★★★
                                            </div>
                                            <span className="text-gray-600 text-sm font-medium ml-2">5.0 (66,951)</span>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mt-1 flex items-center gap-1"><LuMapPin /> Arlington, TN</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Starting from:</span>
                                        <span className="font-bold text-gray-800">$893.30/hr</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><MdLocalPhone /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><LuMessageCircleMore /></span>
                                        <span className="text-gray-700 text-sm font-medium">+1 (555) 987-6543</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 mr-2"><FaUserGraduate /></span>
                                        <span className="text-gray-700 text-sm font-medium">B.Tech in Mechanical Engineering</span>
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Specializes in:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Calculus</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">Physics</span>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">SAT Math</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm mb-2">Availability:</p>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">Mon-Fri: 4 PM - 9 PM</p>
                                        <p className="text-sm text-gray-700">Weekends: 9 AM - 6 PM</p>
                                        <p className="text-xs text-green-600 mt-1">Next available: Tomorrow</p>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex flex-col items-stretch gap-3 mt-auto">
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2 items-center justify-between py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                                        <span>Contact now</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                    <button href="signup.html" className="rounded-sm cursor-pointer flex gap-2  items-center justify-between py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300">
                                        <span>View full profile</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <button className="custom-prev absolute md:top-4 top-25 md:right-20 right-15 z-10 md:h-15 md:w-15 w-7 h-7 md:text-base text-sm rounded-full border border-slate-200 bg-white flex justify-center items-center hover:bg-slate-200 cursor-pointer leading-none"><FaChevronLeft /></button>
                <button className="custom-next absolute md:top-4 top-25 right-4 z-10 md:h-15 md:w-15 w-7 h-7 md:text-base text-sm rounded-full border border-slate-200 bg-white flex justify-center items-center hover:bg-slate-200 cursor-pointer leading-none"><FaChevronRight /></button>
            </div>

        </section>
    );
};

export default TopInstructors;