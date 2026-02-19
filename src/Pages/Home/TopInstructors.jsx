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
import TutorsCard from '../../Components/TutorsCard/TutorsCard';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../Components/Loading/Loading';

const TopInstructors = () => {
    const axios = useAxios();

    const { data: tutors = [], isLoading: isDataLoading } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const { data } = await axios.get('/tutors');
            return data.data;
        }
    });
    // const { data: tuitions = [], isLoading: istuitionsLoading } = useQuery({
    //     queryKey: ['tuitions'],
    //     queryFn: async () => {
    //         const { data } = await axios.get('/tuitions');
    //         return data.data;
    //     }
    // });

    if (isDataLoading) {
        return <Loading />;
    }
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
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        }
                    }}
                    className='mt-10'
                >
                    {tutors.map((tutor) => (
                        <SwiperSlide key={tutor.id} style={{ height: 'auto' }}>
                            <TutorsCard tutor={tutor}></TutorsCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="custom-prev absolute md:top-4 top-25 md:right-20 right-15 z-10 md:h-15 md:w-15 w-7 h-7 md:text-base text-sm rounded-full border border-slate-200 bg-white flex justify-center items-center hover:bg-slate-200 cursor-pointer leading-none"><FaChevronLeft /></button>
                <button className="custom-next absolute md:top-4 top-25 right-4 z-10 md:h-15 md:w-15 w-7 h-7 md:text-base text-sm rounded-full border border-slate-200 bg-white flex justify-center items-center hover:bg-slate-200 cursor-pointer leading-none"><FaChevronRight /></button>
            </div>

        </section>
    );
};

export default TopInstructors;