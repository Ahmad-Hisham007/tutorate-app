// StatsSection.jsx
import React from 'react';

const Statsection2 = () => {
    // Animation styles
    const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `;

    return (
        <>
            <style>{animationStyles}</style>
            <section className="bg-slate-100 py-16">
                <div className="max-w-6xl mx-auto px-4 gap-7.5">
                    {/* Main container with flex layout */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Stats cards container */}
                        <div className="flex flex-col flex-1 md:max-w-4/12">
                            {/* Stats cards row */}
                            <div className="flex flex-col gap-6">

                                {/* Card 1 - Primary Color */}
                                <div
                                    className="flex-1 bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 animate-fadeInUp"
                                    style={{ animationDelay: '0s', opacity: 0 }}
                                >
                                    <div className="mb-2">
                                        <span className="text-4xl md:text-5xl font-primary font-bold text-primary">
                                            20,000
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm md:text-base">
                                        Undergraduate and graduate students
                                    </div>
                                </div>

                                {/* Card 2 - Secondary Color */}
                                <div
                                    className="flex-1 bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 animate-fadeInUp"
                                    style={{ animationDelay: '0.2s', opacity: 0 }}
                                >
                                    <div className="mb-2">
                                        <span className="text-4xl md:text-5xl font-primary font-bold text-primary">
                                            16,214
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm md:text-base">
                                        Undergraduate and graduate students
                                    </div>
                                </div>

                                {/* Card 3 - Accent Color */}
                                <div
                                    className="flex-1 bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 animate-fadeInUp"
                                    style={{ animationDelay: '0.3s', opacity: 0 }}
                                >
                                    <div className="mb-2">
                                        <span className="text-4xl md:text-5xl font-primary font-bold text-primary">
                                            300k
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm md:text-base">
                                        Undergraduate and graduate students
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Images container */}
                        <div className="flex w-full md:flex-2 flex-1">
                            {/* Images grid */}
                            <div className="grid grid-cols-2 gap-7.5 w-full">
                                {/* Image 1 */}
                                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                                    <img
                                        loading="lazy"
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        alt="Educational Image"
                                        className="w-full h-auto object-cover aspect-406/660 transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Image 2 */}
                                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                                    <img
                                        loading="lazy"
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        alt="Educational Image"
                                        className="w-full h-auto object-cover aspect-406/660 transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Statsection2;