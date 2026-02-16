import React from 'react';
import { FaLightbulb, FaRocket } from 'react-icons/fa';

const MissionAndValues = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-primary font-bold mb-4">
                        Mission & <span className="text-primary">Values</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The point of using is that it has a more-or-less normal distribution of letters as opposed to English. There are many don't look even slightly believable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-cyan-300 transition-all hover:shadow-xl">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <FaLightbulb className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-primary font-bold mb-4">Excellence</h3>
                        <p className="text-gray-600">
                            The point of using is that it has a more-or-less normal distribution of letters as opposed to English. There are many don't look even slightly believable.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-amber-200 transition-all hover:shadow-xl">
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                            <FaRocket className="w-8 h-8 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-primary font-bold mb-4">Innovation</h3>
                        <p className="text-gray-600">
                            The point of using is that it has a more-or-less normal distribution of letters as opposed to English. There are many don't look even slightly believable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionAndValues;