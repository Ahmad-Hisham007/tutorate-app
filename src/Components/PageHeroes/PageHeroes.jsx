import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import shape from "../../assets/shap.svg";
import bookShape from "../../assets/book.svg"

const PageHeroes = ({ pageTitle }) => {
    const breadcrumbItems = [
        { title: 'Tuitions', path: "/tuitions" }
    ];
    return (
        <section className="md:py-20 bg-gradient-to-br from-cyan-300/20 to-amber-200/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-7xl mx-auto relative">
                <img src={shape} alt="shape" className='absolute left-0 top-6/12 -translate-y-6/12 w-18 md:w-auto -z-1' />
                {/* Page Title */}
                <h1 className="font-primary text-center text-4xl md:text-5xl font-bold text-base-content]">
                    {pageTitle}
                </h1>
                <img src={bookShape} alt="Book shape" className='absolute right-0 top-6/12 -translate-y-6/12 w-18 md:w-auto -z-1' />

                {/* Breadcrumb */}
                <BreadCrumbs items={breadcrumbItems} />
            </div>
        </section>
    );
};

export default PageHeroes;