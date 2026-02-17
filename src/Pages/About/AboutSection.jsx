import React from 'react';

const AboutSection = () => {
    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-primary font-bold mb-6">
                            We Providing the best quality online <span className="text-primary">Courses.</span>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            There are many variations of passages of available but the majority have suffered alteration in some form by injected words which don't look even slightly believable.
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