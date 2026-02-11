import React from 'react';
import bannerRightImg from "../../assets/img-02.png"
import KnobLine from "../../assets/knob_line.svg"
import { IoChevronForwardOutline, IoShieldOutline } from 'react-icons/io5';

const HeroBanner = () => {
    return (
        <section className="banner">
            <div className="max-w-325 mx-auto px-5">
                <div className="flex md:flex-row flex-col-reverse  items-center gap-7 gapy-5 py-20">
                    <div className="">
                        <div className="tu-banner_title max-w-162">
                            <h1 className='md:text-5xl text-3xl font-black font-primary leading-snug'>A good <span className='text-primary'>#education</span> is always a base of</h1>
                            <span className=" p-2 bg-primary my-3 inline-block rounded-sm font-black capital md:text-5xl text-3xl text-white font-primary">A bright future</span>
                            <p className='mt-3 text-lg max-w-140'>Our comprehensive learning ecosystem bridges the gap between passionate educators and ambitious learners.</p>
                            <ul className="flex md:flex-row flex-col mt-5 relative items-stretch clear-right gap-5">
                                <li className='absolute left-0 -translate-x-full pe-5 -translate-y-6/12'>

                                    <span className='text-sm font-cursive font-medium'>Start from here</span>
                                    <img src={KnobLine} alt="img" className='ms-auto' />

                                </li>
                                <li>
                                    <a href="signup.html" className="rounded-sm flex gap-2 items-center py-4 px-9 leading-normal font-bold bg-linear-90 from-amber-200 to-secondary hover:bg-linear-270 transition-all duration-300">
                                        <span>Start as student</span>
                                        <IoChevronForwardOutline className='text-lg' />
                                    </a>
                                </li>
                                <li>
                                    <a href="signup.html" className="rounded-sm flex gap-2 items-center py-3.5 px-8.5 leading-normal font-normal border-2 border-accent hover:bg-accent transition-all duration-300"><span>Join as Instructor</span><span className='inline-block mb-0.5 font-normal text-primary text-sm'>It’s Free!</span></a>
                                </li>
                            </ul>
                            <div className="mt-5 flex items-top gap-2">
                                <IoShieldOutline className='text-lg mt-1' />
                                <p>You can also join as parent to explore <a href="signup.html" className='font-normal text-primary text-sm'>Join today</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="tu-bannerv1_img">
                            <img src={bannerRightImg} alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;