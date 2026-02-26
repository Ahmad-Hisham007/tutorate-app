import React, { useEffect, useRef, useState } from 'react';
import PageHeroes from '../../../Components/PageHeroes/PageHeroes';
import { IoFilter } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import TuitionCard from '../../../Components/TuitionCard/TuitionCard';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import useSubjectOptions from '../../../Hooks/useSubjectOptions';
import useClassOptions from '../../../Hooks/useClassOptions';


const TuitionsListing = () => {
    const { subjectOptions } = useSubjectOptions();
    const { classOptions } = useClassOptions();
    const axios = useAxios();

    // State
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const isFirstRender = useRef(true);


    // Debounced filters state (only for fields that need debouncing)
    const [debouncedFilters, setDebouncedFilters] = useState({
        location: '',
        subject: '',
        className: ''
    });

    // Location debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(prev => ({
                ...prev,
                location: location
            }));
        }, 500);
        return () => clearTimeout(timer);
    }, [location]);

    // Subject debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(prev => ({
                ...prev,
                subject: subject
            }));
        }, 500);
        return () => clearTimeout(timer);
    }, [subject]);

    // Class debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(prev => ({
                ...prev,
                className: className
            }));
        }, 500);
        return () => clearTimeout(timer);
    }, [className]);

    // Reset to page 1 when debounced filters or sort changes
    useEffect(() => {
        // Skip the first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(1);
    }, [debouncedFilters.location, debouncedFilters.subject, debouncedFilters.className, sortBy]);

    // Build query params
    const getQueryString = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (debouncedFilters.location) params.append('location', debouncedFilters.location);
        if (debouncedFilters.subject) params.append('subject', debouncedFilters.subject);
        if (debouncedFilters.className) params.append('class', debouncedFilters.className);
        if (sortBy) params.append('sortBy', sortBy);
        params.append('page', page);
        return params.toString();
    };

    // Fetch data
    const { data: response, isLoading } = useQuery({
        queryKey: ['tuitions', searchTerm, debouncedFilters.location, debouncedFilters.subject, debouncedFilters.className, sortBy, page],
        queryFn: async () => {
            const { data } = await axios.get(`/tuitions?${getQueryString()}`);
            return data;
        }
    });

    // Location change handler
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    // Subject change handler
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    // Class change handler
    const handleClassChange = (e) => {
        setClassName(e.target.value);
    };

    // Sort change handler
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        // No need for debouncing on sort - immediate
    };

    // Typing indicator for location
    const isLocationTyping = location !== debouncedFilters.location && location;

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(search);
        setPage(1);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearch('');
        setLocation('');
        setSubject('');
        setClassName('');
        setSortBy('newest');
        setSearchTerm('');
        setPage(1);

        // Also clear debounced filters
        setDebouncedFilters({
            location: '',
            subject: '',
            className: ''
        });
    };
    useEffect(() => {
        if (isLoading) {

            const tuitionListElement = document.querySelector('.tuitions-list-container');
            if (tuitionListElement) {
                tuitionListElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {

                window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
                });
            }
        }
    }, [isLoading]);
    useEffect(() => {

        const tuitionContainer = document.querySelector('.tuitions-list-container');
        if (tuitionContainer) {
            tuitionContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [page]);
    const tuitionListings = response?.data || [];
    const total = response?.total || 0;
    const totalPages = response?.totalPages || 1;
    const currentPage = response?.page || 1;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <PageHeroes pageTitle={"Latest Tuitions"} />
            <section className="px-4 sm:px-6 lg:px-8 py-8 bg-[#F7F8FC] tuitions-list-container">
                <div className='max-w-7xl mx-auto'>
                    {/* Header Section */}
                    <div className="mb-4 md:mb-8">
                        <h1 className="font-primary text-3xl md:text-2xl font-medium mb-2">
                            {total} Search results {searchTerm && <span>for "<span className="font-bold">{searchTerm}</span>"</span>}
                        </h1>

                        {/* Sort and Search Row */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex w-full md:w-9/12 bg-white p-2.5 border border-gray-200 rounded-sm">
                                <input
                                    type="text"
                                    placeholder="Search tutors..."
                                    className="grow input input-lg text-sm border-none outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit" className="btn bg-secondary text-white border-none px-6">
                                    Search now
                                </button>
                            </form>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-0 shrink-0 mb-auto">
                                <span className="text-sm text-gray-400">Sort by:</span>
                                <select
                                    className="select select-sm w-48 bg-transparent border-0 font-semibold"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                >
                                    <option value="budget-low">Budget: Low to High</option>
                                    <option value="budget-high">Budget: High to Low</option>
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                    <option value="top-rated">Top rated</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid - 3/9 Layout with Drawer */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Filters Sidebar - 3 columns with drawer */}
                        <div className="lg:col-span-3 drawer lg:drawer-open md:shadow-sm md:shadow-[rgba(0,0,0,0.08)]">
                            <input id="filter-bar" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content flex flex-col items-center justify-center shadow-sm shadow-[rgba(0,0,0,0.08)] mb-10">
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
                                        {(searchTerm || location || subject || className) && (
                                            <div className="space-y-3 border-b border-gray-200 pb-5">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-medium">Active filters</h3>
                                                    <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                                                        Clear all
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {searchTerm && (
                                                        <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                                                            "{searchTerm}"
                                                            <button onClick={() => { setSearch(''); setSearchTerm(''); setPage(1); }}>✕</button>
                                                        </span>
                                                    )}
                                                    {location && (
                                                        <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                                                            {location}
                                                            <button onClick={() => { setLocation(''); setPage(1); }}>✕</button>
                                                        </span>
                                                    )}
                                                    {subject && (
                                                        <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                                                            {subject}
                                                            <button onClick={() => { setSubject(''); setPage(1); }}>✕</button>
                                                        </span>
                                                    )}
                                                    {className && (
                                                        <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                                                            {className}
                                                            <button onClick={() => { setClassName(''); setPage(1); }}>✕</button>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Location Filter */}
                                        <div className="border-0">
                                            <h3 className="font-medium mb-3">Location</h3>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter city or area..."
                                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm focus:border-primary bg-white"
                                                        value={location}
                                                        onChange={handleLocationChange}
                                                    />
                                                    {isLocationTyping && (
                                                        <span className="absolute right-10 top-3 text-xs text-gray-400">
                                                            searching...
                                                        </span>
                                                    )}
                                                    <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Class Filter */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="font-medium mb-3">Classes</h3>
                                            <select
                                                className="select select-bordered w-full"
                                                value={className}
                                                onChange={handleClassChange}
                                            >
                                                <option value="">Select class</option>
                                                {classOptions.map(c => (
                                                    <option key={c.value} value={c.value}>{c.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Subjects Filter */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="font-medium mb-3">Choose subjects</h3>
                                            <select
                                                className="select select-bordered w-full"
                                                value={subject}
                                                onChange={handleSubjectChange}
                                            >
                                                <option value="">Select subject</option>
                                                {subjectOptions.map(s => (
                                                    <option key={s.value} value={s.value}>{s.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        {/* Posts Container - 9 columns */}
                        <div className="lg:col-span-9 ms-0 md:ms-10">
                            {/* Tuition Cards */}
                            {tuitionListings.length === 0 ? (
                                <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                                    No tuitions found
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {tuitionListings.map((tuition) => (
                                            <TuitionCard tuition={tuition} key={tuition._id} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-10">
                                            <div className="join">
                                                <button
                                                    className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                                                    onClick={() => setPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    «
                                                </button>

                                                {[...Array(totalPages)].map((_, index) => {
                                                    const pageNumber = index + 1;
                                                    if (
                                                        pageNumber === 1 ||
                                                        pageNumber === totalPages ||
                                                        Math.abs(pageNumber - currentPage) <= 1
                                                    ) {
                                                        return (
                                                            <button
                                                                key={pageNumber}
                                                                className={`join-item btn ${currentPage === pageNumber ? 'btn-active btn-primary' : ''}`}
                                                                onClick={() => setPage(pageNumber)}
                                                            >
                                                                {pageNumber}
                                                            </button>
                                                        );
                                                    }
                                                    if (pageNumber === 2 && currentPage > 3) {
                                                        return <button key="dots1" className="join-item btn btn-disabled">...</button>;
                                                    }
                                                    if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                                                        return <button key="dots2" className="join-item btn btn-disabled">...</button>;
                                                    }
                                                    return null;
                                                })}

                                                <button
                                                    className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
                                                    onClick={() => setPage(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    »
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-center text-sm text-gray-500 mt-4">
                                        Showing page {currentPage} of {totalPages} • {total} total results
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TuitionsListing;