import React from 'react';

const AboutSection = () => {
    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-primary font-bold mb-6">
                            We are providing the best quality <span className="text-primary">#Tutors.</span>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We focus on delivering courses that are clear, practical, and genuinely useful for your growth. Every lesson is built by experts who know how to explain complex topics in simple ways, so you actually understand and remember what you learn.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform includes hundreds of programs across various fields, all designed to help you build real skills at your own pace. We constantly update our content to match industry changes, ensuring you always have access to the most relevant and up-to-date material available.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Online Education"
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-secondary/20 w-32 h-32 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;