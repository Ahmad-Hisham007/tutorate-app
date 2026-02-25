import React from 'react';
import TuitionCard from '../../Components/TuitionCard/TuitionCard';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';

const LatestTuitions = () => {

    const axios = useAxios();

    const { data: response, isLoading: isDataLoading } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const { data } = await axios.get("/tuitions")
            return data;
        }
    })

    const tuitionListings = response?.data || [];
    const total = response?.total || 0;
    if (isDataLoading) {
        return <Loading />;
    }
    return (
        <section className="py-16 lg:py-24 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                        Featured <span className="text-primary">#Tuitions</span>
                    </h2>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Find the perfect teaching opportunity that matches your expertise and schedule
                    </p>
                </div>

                {/* Tuition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-down">
                    {tuitionListings.map((tuition) => (
                        <TuitionCard tuition={tuition} key={tuition._id}></TuitionCard>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12" data-aos="fade-down">
                    <Link
                        to="/tuitions"
                        className="inline-flex items-center gap-2 font-primary font-semibold text-primary hover:text-primary/80 transition-colors group"
                    >
                        <span>Explore all tuition listings</span>
                        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    <p className="text-sm text-base-content/50 mt-2">
                        {total}+ active tuition opportunities available
                    </p>
                </div>
            </div>
        </section>

    );
};

export default LatestTuitions;