import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function DynamicStats() {
    const [stats, setStats] = useState({ tutors: 142, tuitions: 523, applications: 912 });
    const [loading, setLoading] = useState(true);

    // Trigger animation only when section enters viewport
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        axios.get('/api/users/stats')
            .then(res => {
                if (res.data) {
                    setStats({
                        tutors: res.data.totalTutors || 142,
                        tuitions: res.data.totalTuitions || 523,
                        applications: res.data.totalApplications || 912
                    });
                }
                setLoading(false);
            })
            .catch(() => setLoading(false)); // Gracefully falls back to defaults if offline
    }, []);

    return (
        <section ref={ref} className="bg-[#FAE9E2] py-16 px-4 my-12 relative overflow-hidden">
            {/* Unique Abstract Background Visual Elements */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#33BAAE]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F29D42]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header with Clear Visual Hierarchy */}
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-widest text-[#33BAAE] uppercase bg-[#33BAAE]/10 px-3 py-1 rounded-full">
                        Live Platform Activity
                    </span>
                    <h2 className="text-3xl font-black text-[#1B2E28] mt-3 tracking-tight">
                        Tutorate by the Numbers
                    </h2>
                    <p className="text-sm text-[#1B2E28]/70 mt-2 max-w-md mx-auto">
                        Real-time metrics tracking connection, academic growth, and successful placements across the network.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Instructors */}
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white shadow-xl shadow-[#1B2E28]/5 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-wider text-[#1B2E28]/50 uppercase">Network Scale</span>
                            <div className="w-2 h-2 rounded-full bg-[#33BAAE] animate-pulse"></div>
                        </div>
                        <div className="text-5xl font-black text-[#33BAAE] tracking-tight mb-2">
                            {inView ? <CountUp end={stats.tutors} duration={2.5} separator="," /> : '0'}+
                        </div>
                        <h3 className="text-base font-bold text-[#1B2E28]">Verified Instructors</h3>
                        <p className="text-xs text-[#1B2E28]/60 mt-1">Expert educators approved for targeted teaching criteria.</p>
                    </div>

                    {/* Card 2: Tuition Posts */}
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white shadow-xl shadow-[#1B2E28]/5 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-wider text-[#1B2E28]/50 uppercase">Active Demand</span>
                            <div className="w-2 h-2 rounded-full bg-[#F29D42] animate-pulse"></div>
                        </div>
                        <div className="text-5xl font-black text-[#F29D42] tracking-tight mb-2">
                            {inView ? <CountUp end={stats.tuitions} duration={2.5} separator="," /> : '0'}+
                        </div>
                        <h3 className="text-base font-bold text-[#1B2E28]">Tuition Job Posts</h3>
                        <p className="text-xs text-[#1B2E28]/60 mt-1">Open learning requests posted by parents and pupils looking for help.</p>
                    </div>

                    {/* Card 3: Applications */}
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white shadow-xl shadow-[#1B2E28]/5 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-wider text-[#1B2E28]/50 uppercase">Success Rate</span>
                            <div className="w-2 h-2 rounded-full bg-[#33BAAE] animate-pulse"></div>
                        </div>
                        <div className="text-5xl font-black text-[#33BAAE] tracking-tight mb-2">
                            {inView ? <CountUp end={stats.applications} duration={2.5} separator="," /> : '0'}+
                        </div>
                        <h3 className="text-base font-bold text-[#1B2E28]">Submitted Applications</h3>
                        <p className="text-xs text-[#1B2E28]/60 mt-1">Tutors applying to meet specific custom class match requirements.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}