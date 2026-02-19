import React from 'react';
import PageHeroes from '../../../../Components/PageHeroes/PageHeroes';
import TutorsCard from '../../../../Components/TutorsCard/TutorsCard';
import useAxios from '../../../../Hooks/useAxios';
import { useQuery } from "@tanstack/react-query"
import Loading from '../../../../Components/Loading/Loading';

const TutorsListing = () => {
    const axios = useAxios();
    const {
        data: tutorsData = [],
        isLoading: isDataLoading
    } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const { data } = await axios.get('/tutors');
            return data.data;
        }
    });

    if (isDataLoading) {
        return <Loading></Loading>
    }
    console.log(tutorsData)


    return (
        <>
            <PageHeroes pageTitle={"Tutors"} >
            </PageHeroes>
            <section className='md:my-25 my-17'>
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                            Meet Our <span className="text-primary">#Expert Tutors</span>
                        </h2>
                        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                            Learn from highly qualified instructors with proven track records
                        </p>

                        {/* Filter Tabs */}
                        {/* <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["All Tutors", "Math", "Science", "Languages", "Test Prep", "Arts"].map((filter) => (
                                <button
                                    key={filter}
                                    className="px-5 py-2 rounded-full border border-base-content/10 text-base-content/70 hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div> */}
                    </div>

                    {/* Tutors Grid */}
                    <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {tutorsData.map(tutor => {
                            return <TutorsCard key={tutor._id} tutor={tutor}></TutorsCard>
                        })}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-primary text-base-100 rounded-lg font-primary font-bold hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2 group">
                            <span>Load More Tutors</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <p className="text-sm text-base-content/50 mt-4">
                            Showing 8 of 248+ available tutors
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TutorsListing;