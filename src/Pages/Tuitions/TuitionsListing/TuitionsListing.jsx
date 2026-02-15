import React from 'react';
import PageHeroes from '../../../Components/PageHeroes/PageHeroes';
import { IoFilter } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import TuitionCard from '../../../Components/TuitionCard/TuitionCard';

const TuitionsListing = () => {
    const tuitionListings = [
        {
            id: 1,
            title: "Mathematics Tutor for High School",
            institution: "Lincoln High School",
            location: "Boston, MA",
            type: "Part-time",
            mode: "Hybrid",
            budget: "$45-60/hr",
            students: "Grade 9-12",
            subject: "Calculus & Algebra",
            posted: "2 days ago",
            applicants: 12,
            slots: 2,
            badge: "FEATURED",
            badgeColor: "primary"
        },
        {
            id: 2,
            title: "Physics & Chemistry Teacher",
            institution: "Summit Academy",
            location: "Austin, TX",
            type: "Full-time",
            mode: "On-site",
            budget: "$65-80/hr",
            students: "Grade 11-12",
            subject: "AP Physics, Chemistry",
            posted: "5 hours ago",
            applicants: 8,
            slots: 1,
            badge: "URGENT",
            badgeColor: "secondary"
        },
        {
            id: 3,
            title: "English Literature Tutor",
            institution: "Riverside School",
            location: "Portland, OR",
            type: "Contract",
            mode: "Online",
            budget: "$40-55/hr",
            students: "Middle School",
            subject: "Creative Writing, Grammar",
            posted: "1 day ago",
            applicants: 15,
            slots: 3,
            badge: "NEW",
            badgeColor: "accent"
        },
        {
            id: 4,
            title: "Computer Science Instructor",
            institution: "Tech Valley High",
            location: "San Jose, CA",
            type: "Part-time",
            mode: "Remote",
            budget: "$70-90/hr",
            students: "High School",
            subject: "Python, Web Dev",
            posted: "3 days ago",
            applicants: 9,
            slots: 2,
            badge: "HIRING",
            badgeColor: "primary"
        },
        {
            id: 5,
            title: "Biology & Life Sciences",
            institution: "Greenwood Academy",
            location: "Raleigh, NC",
            type: "Full-time",
            mode: "Hybrid",
            budget: "$50-65/hr",
            students: "Grade 9-10",
            subject: "AP Biology, Ecology",
            posted: "6 hours ago",
            applicants: 6,
            slots: 1,
            badge: "URGENT",
            badgeColor: "secondary"
        },
        {
            id: 6,
            title: "Spanish Language Teacher",
            institution: "Global Learning Center",
            location: "Miami, FL",
            type: "Contract",
            mode: "Online",
            budget: "$35-50/hr",
            students: "All Levels",
            subject: "Conversational Spanish",
            posted: "4 days ago",
            applicants: 21,
            slots: 4,
            badge: "FLEXIBLE",
            badgeColor: "accent"
        },
        {
            id: 7,
            title: "History & Social Studies",
            institution: "Heritage School",
            location: "Philadelphia, PA",
            type: "Part-time",
            mode: "On-site",
            budget: "$40-55/hr",
            students: "Grade 6-8",
            subject: "World History, Civics",
            posted: "1 week ago",
            applicants: 5,
            slots: 2,
            badge: "FEATURED",
            badgeColor: "primary"
        },
        {
            id: 8,
            title: "Art & Design Mentor",
            institution: "Creative Arts Institute",
            location: "Chicago, IL",
            type: "Freelance",
            mode: "Hybrid",
            budget: "$30-45/hr",
            students: "High School",
            subject: "Drawing, Digital Art",
            posted: "2 days ago",
            applicants: 18,
            slots: 3,
            badge: "NEW",
            badgeColor: "accent"
        }
    ];

    return (
        <>
            <PageHeroes pageTitle={"Latest Tuitions"}></PageHeroes>
            <section className="px-4 sm:px-6 lg:px-8 py-8 bg-[#F7F8FC]">

                <div className='max-w-7xl mx-auto'>
                    {/* Header Section */}
                    <div className="mb-4 md:mb-8">
                        <h1 className="font-primary text-3xl md:text-2xl font-medium text-base-content] mb-2">
                            132,576 Search results i   “<span className='font-bold'>Mathematic</span>” tutors
                        </h1>

                        {/* Sort and Search Row */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
                            {/* Search Bar */}
                            <div className="flex items-center justify-end w-full md:w-9/12 bg-white p-2.5 border border-[#eee] shadow-sm shadow-[rgba(0,0,0,0.08)] rounded-sm">
                                <input
                                    type="text"
                                    placeholder="Search tutors..."
                                    className="input grow w-full input-lg text-base-content text-sm font-semibold focus:border-none border-none outline-0 shadow-none"
                                />
                                <button className="btn bg-secondary hover:bg-secondary/90 text-white border-none py-3 h-auto text-base font-primary px-4 md:px-6">
                                    Search now
                                </button>
                            </div>
                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-0 shrink-0 mb-auto">
                                <span className="text-sm text-gray-400">Sort by:</span>
                                <select className="select select-sm w-48 text-base-content bg-transparent [&>option]:bg-base-100 focus:outline-none focus:shadow-none outline-none border-0 shadow-none font-semibold">
                                    <option>Budget: Low to High</option>
                                    <option>Budget: High to Low</option>
                                    <option>Newest first</option>
                                    <option>Oldest first</option>
                                    <option>Top rated</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Main Content Grid - 3/9 Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Filters Sidebar - 3 columns */}
                        <div className="lg:col-span-3 drawer lg:drawer-open md:shadow-sm md:shadow-[rgba(0,0,0,0.08)]">
                            <input id="filter-bar" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content flex flex-col items-center justify-center shadow-sm shadow-[rgba(0,0,0,0.08)] mb-10">
                                {/* Page content here */}
                                <label htmlFor="filter-bar" className="btn drawer-button lg:hidden border-0 w-full">
                                    <IoFilter /> Filters
                                </label>
                            </div>
                            <div className="drawer-side z-999">

                                <ul className="menu bg-white border border-gray-100 rounded-sm min-h-full w-80 md:p-4 p-0">
                                    <div className='px-6 py-3 border-b border-slate-200 font-semibold text-xl flex items-center justify-between'>
                                        <span>Filters</span>
                                        <span className='md:hidden block'>
                                            <label htmlFor="filter-bar" aria-label="close sidebar" className="drawer-overlay">
                                                <IoMdClose />
                                            </label>
                                        </span>
                                    </div>
                                    <div className="space-y-6 md:px-0 md:py-6 p-6">
                                        {/* Active Filters */}
                                        <div className="space-y-3">
                                            <h3 className="font-medium text-[--color-base-content]">Active filters</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-300/20 text-[--color-base-content] text-sm rounded-full">
                                                    Pre-School
                                                    <button className="hover:text-[--color-primary]">✕</button>
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-200/30 text-[--color-base-content] text-sm rounded-full">
                                                    Intermediate
                                                    <button className="hover:text-[--color-secondary]">✕</button>
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[--color-accent]/10 text-[--color-base-content] text-sm rounded-full">
                                                    5.0 Stars
                                                    <button className="hover:text-[--color-accent]">✕</button>
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[--color-primary]/10 text-[--color-base-content] text-sm rounded-full">
                                                    Online bookings
                                                    <button className="hover:text-[--color-primary]">✕</button>
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-[--color-base-content] text-sm rounded-full">
                                                    Male only
                                                    <button className="hover:text-[--color-primary]">✕</button>
                                                </span>
                                            </div>
                                        </div>
                                        {/* Location Filter */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="font-medium text-[--color-base-content] mb-3">Location</h3>

                                            {/* City/Area Search */}
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter city or area..."
                                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[--color-primary] bg-white"
                                                    />
                                                    <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Education Level Filter */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="font-medium text-[--color-base-content] mb-3">Education level</h3>
                                            <select className="select select-bordered w-full bg-white border-gray-200 text-[--color-base-content] focus:border-[--color-primary]">
                                                <option>Select education level</option>
                                                <option>Pre-School</option>
                                                <option>Primary</option>
                                                <option>Middle (Class 6–8)</option>
                                                <option>High School</option>
                                                <option>Undergraduate</option>
                                                <option>Graduate</option>
                                            </select>
                                        </div>

                                        {/* Subjects Filter */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="font-medium text-[--color-base-content] mb-3">Choose subjects</h3>
                                            <div className="space-y-2">
                                                {['Social studies', 'Urdu', 'Mathematics', 'Drawing', 'Computer science'].map((subject) => (
                                                    <label key={subject} className="flex items-center gap-2 text-sm text-[--color-base-content]/80">
                                                        <input type="checkbox" className="checkbox checkbox-sm border-gray-300 rounded checked:bg-[--color-primary] checked:border-[--color-primary]" />
                                                        {subject}
                                                    </label>
                                                ))}
                                            </div>
                                            {/* <button className="text-sm text-[--color-primary] hover:underline mt-3 font-medium">
                                                Show all →
                                            </button> */}
                                        </div>

                                        {/* Match Me Button */}
                                        <div className="border-t border-gray-200 pt-6 mt-auto">
                                            <button className="btn w-full bg-primary hover:bg-[--color-accent]/90 text-white border-none">
                                                Match Me
                                            </button>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                        </div>

                        {/* Posts Container - 9 columns */}
                        <div className="lg:col-span-9 ms-0 md:ms-10">
                            {/* Posts container*/}
                            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                                {/* <div className="text-center py-12 text-[--color-base-content]/50 border border-dashed border-gray-200 rounded-lg ">
                                    Posts container - Tutor cards will appear here
                                </div> */}
                                {tuitionListings.map((tuition) => (
                                    <TuitionCard tuition={tuition} key={tuition.id}></TuitionCard>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </>
    );
};

export default TuitionsListing;