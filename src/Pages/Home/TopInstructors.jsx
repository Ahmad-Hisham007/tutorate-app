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

const TopInstructors = () => {
    const tutorsData = [
        {
            id: 1,
            initials: "DG",
            name: "Dwayne Garrett",
            location: "Arlington, TN",
            rating: 5.0,
            reviews: 66951,
            hourlyRate: 893.30,
            phone: "+1 (555) 123-4567",
            whatsapp: "+1 (555) 987-6543",
            qualification: "B.Tech in Mechanical Engineering",
            specializations: ["Calculus", "Physics", "SAT Math"],
            availability: {
                weekdays: "Mon-Fri: 4 PM - 9 PM",
                weekends: "Weekends: 9 AM - 6 PM",
                nextAvailable: "Tomorrow"
            }
        },
        {
            id: 2,
            initials: "GP",
            name: "Gwendolyn Parker",
            location: "Las Vegas, NV",
            rating: 5.0,
            reviews: 38494,
            hourlyRate: 1385.10,
            phone: "+1 (555) 234-5678",
            whatsapp: "+1 (555) 876-5432",
            qualification: "M.A. in English Literature",
            specializations: ["Creative Writing", "SAT/ACT English", "College Essays"],
            availability: {
                weekdays: "Mon-Fri: 3 PM - 8 PM",
                weekends: "Weekends: 10 AM - 4 PM",
                nextAvailable: "Today"
            }
        },
        {
            id: 3,
            initials: "GB",
            name: "Glen Burns",
            location: "Chicago, IL",
            rating: 5.0,
            reviews: 47044,
            hourlyRate: 1336.83,
            phone: "+1 (555) 345-6789",
            whatsapp: "+1 (555) 765-4321",
            qualification: "Ph.D. in Chemistry",
            specializations: ["AP Chemistry", "Organic Chemistry", "Biochemistry"],
            availability: {
                weekdays: "Mon-Fri: 5 PM - 10 PM",
                weekends: "Weekends: 9 AM - 5 PM",
                nextAvailable: "Tomorrow"
            }
        },
        {
            id: 4,
            initials: "WW",
            name: "William Williams",
            location: "Nashville, TN",
            rating: 5.0,
            reviews: 57282,
            hourlyRate: 1198.12,
            phone: "+1 (555) 456-7890",
            whatsapp: "+1 (555) 654-3210",
            qualification: "M.Sc. in Mathematics",
            specializations: ["Algebra", "Geometry", "Statistics"],
            availability: {
                weekdays: "Mon, Wed, Fri: 4 PM - 9 PM",
                weekends: "Sat: 10 AM - 3 PM",
                nextAvailable: "In 2 days"
            }
        },
        {
            id: 5,
            initials: "MR",
            name: "Maria Rodriguez",
            location: "Miami, FL",
            rating: 4.9,
            reviews: 42150,
            hourlyRate: 945.50,
            phone: "+1 (555) 567-8901",
            whatsapp: "+1 (555) 543-2109",
            qualification: "M.A. in Spanish Linguistics",
            specializations: ["Spanish", "French", "ESL"],
            availability: {
                weekdays: "Daily: 9 AM - 8 PM",
                weekends: "Weekends: 10 AM - 6 PM",
                nextAvailable: "Today"
            }
        },
        {
            id: 6,
            initials: "AK",
            name: "Alex Kim",
            location: "San Francisco, CA",
            rating: 5.0,
            reviews: 31882,
            hourlyRate: 1450.75,
            phone: "+1 (555) 678-9012",
            whatsapp: "+1 (555) 432-1098",
            qualification: "M.S. Computer Science",
            specializations: ["Python", "JavaScript", "Machine Learning"],
            availability: {
                weekdays: "Flexible schedule",
                weekends: "By appointment",
                nextAvailable: "Tomorrow"
            }
        },
        {
            id: 7,
            initials: "SJ",
            name: "Sarah Johnson",
            location: "Seattle, WA",
            rating: 4.9,
            reviews: 28345,
            hourlyRate: 875.00,
            phone: "+1 (555) 789-0123",
            whatsapp: "+1 (555) 321-0987",
            qualification: "B.F.A. in Fine Arts",
            specializations: ["Drawing", "Painting", "Digital Art"],
            availability: {
                weekdays: "Tue, Thu: 2 PM - 8 PM",
                weekends: "Sat: 11 AM - 5 PM",
                nextAvailable: "Thursday"
            }
        },
        {
            id: 8,
            initials: "JC",
            name: "James Chen",
            location: "New York, NY",
            rating: 5.0,
            reviews: 52341,
            hourlyRate: 1599.99,
            phone: "+1 (555) 890-1234",
            whatsapp: "+1 (555) 210-9876",
            qualification: "Ph.D. in Physics",
            specializations: ["Quantum Physics", "Mechanics", "Astrophysics"],
            availability: {
                weekdays: "By appointment",
                weekends: "Limited availability",
                nextAvailable: "Next week"
            }
        }
    ];
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
                    {tutorsData.map((tutor) => (
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