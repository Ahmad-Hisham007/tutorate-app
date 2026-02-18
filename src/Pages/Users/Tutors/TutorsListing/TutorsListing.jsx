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

    // const tutorsData = [
    //     {
    //         id: 1,
    //         initials: "DG",
    //         name: "Dwayne Garrett",
    //         location: "Arlington, TN",
    //         rating: 5.0,
    //         reviews: 66951,
    //         hourlyRate: 893.30,
    //         phone: "+1 (555) 123-4567",
    //         whatsapp: "+1 (555) 987-6543",
    //         qualification: "B.Tech in Mechanical Engineering",
    //         specializations: ["Calculus", "Physics", "SAT Math"],
    //         availability: {
    //             weekdays: "Mon-Fri: 4 PM - 9 PM",
    //             weekends: "Weekends: 9 AM - 6 PM",
    //             nextAvailable: "Tomorrow"
    //         }
    //     },
    //     {
    //         id: 2,
    //         initials: "GP",
    //         name: "Gwendolyn Parker",
    //         location: "Las Vegas, NV",
    //         rating: 5.0,
    //         reviews: 38494,
    //         hourlyRate: 1385.10,
    //         phone: "+1 (555) 234-5678",
    //         whatsapp: "+1 (555) 876-5432",
    //         qualification: "M.A. in English Literature",
    //         specializations: ["Creative Writing", "SAT/ACT English", "College Essays"],
    //         availability: {
    //             weekdays: "Mon-Fri: 3 PM - 8 PM",
    //             weekends: "Weekends: 10 AM - 4 PM",
    //             nextAvailable: "Today"
    //         }
    //     },
    //     {
    //         id: 3,
    //         initials: "GB",
    //         name: "Glen Burns",
    //         location: "Chicago, IL",
    //         rating: 5.0,
    //         reviews: 47044,
    //         hourlyRate: 1336.83,
    //         phone: "+1 (555) 345-6789",
    //         whatsapp: "+1 (555) 765-4321",
    //         qualification: "Ph.D. in Chemistry",
    //         specializations: ["AP Chemistry", "Organic Chemistry", "Biochemistry"],
    //         availability: {
    //             weekdays: "Mon-Fri: 5 PM - 10 PM",
    //             weekends: "Weekends: 9 AM - 5 PM",
    //             nextAvailable: "Tomorrow"
    //         }
    //     },
    //     {
    //         id: 4,
    //         initials: "WW",
    //         name: "William Williams",
    //         location: "Nashville, TN",
    //         rating: 5.0,
    //         reviews: 57282,
    //         hourlyRate: 1198.12,
    //         phone: "+1 (555) 456-7890",
    //         whatsapp: "+1 (555) 654-3210",
    //         qualification: "M.Sc. in Mathematics",
    //         specializations: ["Algebra", "Geometry", "Statistics"],
    //         availability: {
    //             weekdays: "Mon, Wed, Fri: 4 PM - 9 PM",
    //             weekends: "Sat: 10 AM - 3 PM",
    //             nextAvailable: "In 2 days"
    //         }
    //     },
    //     {
    //         id: 5,
    //         initials: "MR",
    //         name: "Maria Rodriguez",
    //         location: "Miami, FL",
    //         rating: 4.9,
    //         reviews: 42150,
    //         hourlyRate: 945.50,
    //         phone: "+1 (555) 567-8901",
    //         whatsapp: "+1 (555) 543-2109",
    //         qualification: "M.A. in Spanish Linguistics",
    //         specializations: ["Spanish", "French", "ESL"],
    //         availability: {
    //             weekdays: "Daily: 9 AM - 8 PM",
    //             weekends: "Weekends: 10 AM - 6 PM",
    //             nextAvailable: "Today"
    //         }
    //     },
    //     {
    //         id: 6,
    //         initials: "AK",
    //         name: "Alex Kim",
    //         location: "San Francisco, CA",
    //         rating: 5.0,
    //         reviews: 31882,
    //         hourlyRate: 1450.75,
    //         phone: "+1 (555) 678-9012",
    //         whatsapp: "+1 (555) 432-1098",
    //         qualification: "M.S. Computer Science",
    //         specializations: ["Python", "JavaScript", "Machine Learning"],
    //         availability: {
    //             weekdays: "Flexible schedule",
    //             weekends: "By appointment",
    //             nextAvailable: "Tomorrow"
    //         }
    //     },
    //     {
    //         id: 7,
    //         initials: "SJ",
    //         name: "Sarah Johnson",
    //         location: "Seattle, WA",
    //         rating: 4.9,
    //         reviews: 28345,
    //         hourlyRate: 875.00,
    //         phone: "+1 (555) 789-0123",
    //         whatsapp: "+1 (555) 321-0987",
    //         qualification: "B.F.A. in Fine Arts",
    //         specializations: ["Drawing", "Painting", "Digital Art"],
    //         availability: {
    //             weekdays: "Tue, Thu: 2 PM - 8 PM",
    //             weekends: "Sat: 11 AM - 5 PM",
    //             nextAvailable: "Thursday"
    //         }
    //     },
    //     {
    //         id: 8,
    //         initials: "JC",
    //         name: "James Chen",
    //         location: "New York, NY",
    //         rating: 5.0,
    //         reviews: 52341,
    //         hourlyRate: 1599.99,
    //         phone: "+1 (555) 890-1234",
    //         whatsapp: "+1 (555) 210-9876",
    //         qualification: "Ph.D. in Physics",
    //         specializations: ["Quantum Physics", "Mechanics", "Astrophysics"],
    //         availability: {
    //             weekdays: "By appointment",
    //             weekends: "Limited availability",
    //             nextAvailable: "Next week"
    //         }
    //     }
    // ];


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