import React, { useState } from 'react';
import PageHeroes from '../../../Components/PageHeroes/PageHeroes';
import { IoFilter } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import TuitionCard from '../../../Components/TuitionCard/TuitionCard';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Bangla', 'ICT', 'History'];
const classes = ['Class 6-8', 'Class 9-10', 'SSC', 'HSC', 'HSC & Admission Test', 'University'];

const TuitionsListing = () => {
    const axios = useAxios();

    // State
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    // Build query params - only page number sends to backend
    const getQueryString = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (location) params.append('location', location);
        if (subject) params.append('subject', subject);
        if (className) params.append('class', className);
        if (sortBy) params.append('sortBy', sortBy);
        params.append('page', page); // backend handles limit (12)
        return params.toString();
    };

    // Fetch data
    const { data: response, isLoading } = useQuery({
        queryKey: ['tuitions', searchTerm, location, subject, className, sortBy, page],
        queryFn: async () => {
            const { data } = await axios.get(`/tuitions?${getQueryString()}`);
            return data;
        }
    });

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
    };

    const tuitionListings = response?.data || [];
    const total = response?.total || 0;
    const totalPages = response?.totalPages || 1;
    const currentPage = response?.page || 1;
    console.log(tuitionListings,
        total,
        totalPages,
        currentPage)
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <PageHeroes pageTitle={"Latest Tuitions"} />
            <section className="px-4 sm:px-6 lg:px-8 py-8 bg-[#F7F8FC]">
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
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        setPage(1);
                                    }}
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

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-3">
                            <div className="bg-white border border-gray-100 rounded-sm p-6">
                                {/* Active Filters */}
                                {(searchTerm || location || subject || className) && (
                                    <div className="mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex justify-between items-center mb-3">
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
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Location</h3>
                                    <input
                                        type="text"
                                        placeholder="Enter city or area..."
                                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm focus:border-primary"
                                        value={location}
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>

                                {/* Class Filter */}
                                <div className="mb-6 border-t border-gray-200 pt-6">
                                    <h3 className="font-medium mb-3">Classes</h3>
                                    <select
                                        className="select select-bordered w-full"
                                        value={className}
                                        onChange={(e) => {
                                            setClassName(e.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <option value="">Select class</option>
                                        {classes.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subjects Filter */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-medium mb-3">Choose subjects</h3>
                                    <select
                                        className="select select-bordered w-full"
                                        value={subject}
                                        onChange={(e) => {
                                            setSubject(e.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <option value="">Select subject</option>
                                        {subjects.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Posts Container */}
                        <div className="lg:col-span-9">
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

                                    {/* Pagination - Only show if more than 1 page */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-10">
                                            <div className="join">
                                                {/* Previous Button */}
                                                <button
                                                    className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                                                    onClick={() => setPage(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    «
                                                </button>

                                                {/* Page Numbers */}
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const pageNumber = index + 1;
                                                    // Show first, last, current and nearby pages
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
                                                    // Show dots
                                                    if (pageNumber === 2 && currentPage > 3) {
                                                        return <button key="dots1" className="join-item btn btn-disabled">...</button>;
                                                    }
                                                    if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                                                        return <button key="dots2" className="join-item btn btn-disabled">...</button>;
                                                    }
                                                    return null;
                                                })}

                                                {/* Next Button */}
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

                                    {/* Showing results info */}
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