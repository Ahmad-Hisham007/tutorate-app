import React from 'react';

const HistorySection = () => {
    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-primary font-bold mb-6">
                            The History of <span className="text-primary">Unisex</span>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            There are many variations of passages of available but the majority have suffered alteration in some form by injected words which don't look even slightly believable. The point of using is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-cyan-300 to-primary/20 p-8 rounded-2xl text-center">
                            <div className="text-4xl font-primary font-bold text-primary mb-2">90%</div>
                            <p className="text-base-content">Post-Graduation</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-200 to-secondary/20 p-8 rounded-2xl text-center">
                            <div className="text-lg font-primary font-bold text-secondary mb-2">Top</div>
                            <p className="text-base-content">Colleges That Create Futures</p>
                        </div>
                        <div className="col-span-2 bg-gradient-to-br from-accent/20 to-purple-200 p-8 rounded-2xl text-center">
                            <div className="text-4xl font-primary font-bold text-accent mb-2">No. 1</div>
                            <p className="text-base-content">In The Nation For Materials</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistorySection;