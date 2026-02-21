import React from 'react';
import TuitionCard from '../../Components/TuitionCard/TuitionCard';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';

const LatestTuitions = () => {

    const axios = useAxios();

    // const tuitionListings = [
    //     {
    //         id: 1,
    //         title: "Mathematics Tutor for High School",
    //         institution: "Lincoln High School",
    //         location: "Boston, MA",
    //         type: "Part-time",
    //         mode: "Hybrid",
    //         budget: "$45-60/hr",
    //         students: "Grade 9-12",
    //         subject: "Calculus & Algebra",
    //         posted: "2 days ago",
    //         applicants: 12,
    //         slots: 2,
    //         badge: "FEATURED",
    //         badgeColor: "primary"
    //     },
    //     {
    //         id: 2,
    //         title: "Physics & Chemistry Teacher",
    //         institution: "Summit Academy",
    //         location: "Austin, TX",
    //         type: "Full-time",
    //         mode: "On-site",
    //         budget: "$65-80/hr",
    //         students: "Grade 11-12",
    //         subject: "AP Physics, Chemistry",
    //         posted: "5 hours ago",
    //         applicants: 8,
    //         slots: 1,
    //         badge: "URGENT",
    //         badgeColor: "secondary"
    //     },
    //     {
    //         id: 3,
    //         title: "English Literature Tutor",
    //         institution: "Riverside School",
    //         location: "Portland, OR",
    //         type: "Contract",
    //         mode: "Online",
    //         budget: "$40-55/hr",
    //         students: "Middle School",
    //         subject: "Creative Writing, Grammar",
    //         posted: "1 day ago",
    //         applicants: 15,
    //         slots: 3,
    //         badge: "NEW",
    //         badgeColor: "accent"
    //     },
    //     {
    //         id: 4,
    //         title: "Computer Science Instructor",
    //         institution: "Tech Valley High",
    //         location: "San Jose, CA",
    //         type: "Part-time",
    //         mode: "Remote",
    //         budget: "$70-90/hr",
    //         students: "High School",
    //         subject: "Python, Web Dev",
    //         posted: "3 days ago",
    //         applicants: 9,
    //         slots: 2,
    //         badge: "HIRING",
    //         badgeColor: "primary"
    //     },
    //     {
    //         id: 5,
    //         title: "Biology & Life Sciences",
    //         institution: "Greenwood Academy",
    //         location: "Raleigh, NC",
    //         type: "Full-time",
    //         mode: "Hybrid",
    //         budget: "$50-65/hr",
    //         students: "Grade 9-10",
    //         subject: "AP Biology, Ecology",
    //         posted: "6 hours ago",
    //         applicants: 6,
    //         slots: 1,
    //         badge: "URGENT",
    //         badgeColor: "secondary"
    //     },
    //     {
    //         id: 6,
    //         title: "Spanish Language Teacher",
    //         institution: "Global Learning Center",
    //         location: "Miami, FL",
    //         type: "Contract",
    //         mode: "Online",
    //         budget: "$35-50/hr",
    //         students: "All Levels",
    //         subject: "Conversational Spanish",
    //         posted: "4 days ago",
    //         applicants: 21,
    //         slots: 4,
    //         badge: "FLEXIBLE",
    //         badgeColor: "accent"
    //     },
    //     {
    //         id: 7,
    //         title: "History & Social Studies",
    //         institution: "Heritage School",
    //         location: "Philadelphia, PA",
    //         type: "Part-time",
    //         mode: "On-site",
    //         budget: "$40-55/hr",
    //         students: "Grade 6-8",
    //         subject: "World History, Civics",
    //         posted: "1 week ago",
    //         applicants: 5,
    //         slots: 2,
    //         badge: "FEATURED",
    //         badgeColor: "primary"
    //     },
    //     {
    //         id: 8,
    //         title: "Art & Design Mentor",
    //         institution: "Creative Arts Institute",
    //         location: "Chicago, IL",
    //         type: "Freelance",
    //         mode: "Hybrid",
    //         budget: "$30-45/hr",
    //         students: "High School",
    //         subject: "Drawing, Digital Art",
    //         posted: "2 days ago",
    //         applicants: 18,
    //         slots: 3,
    //         badge: "NEW",
    //         badgeColor: "accent"
    //     }
    // ];


    const { data: response, isLoading: isDataLoading } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const { data } = await axios.get("/tuitions")
            return data;
        }
    })

    const tuitionListings = response?.data || [];
    const total = response?.total || 0;
    console.log(response)
    if (isDataLoading) {
        return <Loading />;
    }
    return (
        <section className="py-16 lg:py-24 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                        Featured <span className="text-primary">#Tuitions</span>
                    </h2>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Find the perfect teaching opportunity that matches your expertise and schedule
                    </p>
                </div>

                {/* Tuition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tuitionListings.map((tuition) => (
                        <TuitionCard tuition={tuition} key={tuition._id}></TuitionCard>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
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