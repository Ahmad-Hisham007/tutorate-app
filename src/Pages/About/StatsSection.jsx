import React from 'react';

const StatsSection = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-primary font-bold text-primary mb-2">20,000</div>
                        <p className="text-gray-600">Undergraduate and graduate students</p>
                    </div>
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-primary font-bold text-secondary mb-2">16,214</div>
                        <p className="text-gray-600">Undergraduate and graduate students</p>
                    </div>
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-primary font-bold text-accent mb-2">300k</div>
                        <p className="text-gray-600">Undergraduate and graduate students</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;