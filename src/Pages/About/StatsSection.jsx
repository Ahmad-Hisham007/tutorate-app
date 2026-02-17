import React from 'react';

const StatsSection = () => {
    return (
        <section className="py-16 bg-slate-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center flex flex-col items-start justify-center md:p-12 p-7 bg-white rounded-xl hover:shadow-xl transition-shadow">
                        <div className="text-5xl text-start font-primary font-bold text-primary mb-2">90 %</div>
                        <p className="text-gray-600 text-start font-medium text-lg leading-relaxed mt-2.5">Post-Graduation</p>
                    </div>
                    <div className="text-center flex flex-col items-start justify-center md:p-12 p-7 bg-white rounded-xl hover:shadow-xl transition-shadow">
                        <div className="text-5xl text-start font-primary font-bold text-primary mb-2">Top</div>
                        <p className="text-gray-600 text-start font-medium text-lg leading-relaxed mt-2.5">Undergraduate and graduate students</p>
                    </div>
                    <div className="text-center flex flex-col items-start justify-center md:p-12 p-7 bg-white rounded-xl hover:shadow-xl transition-shadow">
                        <div className="text-5xl text-start font-primary font-bold text-primary mb-2">No. 1</div>
                        <p className="text-gray-600 text-start font-medium text-lg leading-relaxed mt-2.5">In The Nation For Materials

                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;