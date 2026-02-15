import React from 'react';

const Loading = ({ loadingText = "Loading" }) => {
    return (
        <section className='min-h-screen py-50 flex items-center justify-center'>
            <span className="loading loading-spinner text-amber"></span>
            <span className='text-2xl font-bold'>{loadingText}</span>
        </section>
    );
};

export default Loading;