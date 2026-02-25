import React from 'react';
import favico from "/favicon.png"

const Loading = () => {
    return (
        <section className='min-h-screen flex items-center justify-center bg-white'>
            <div className='relative'>


                {/* Inner content box */}
                <div className='relative text-center'>
                    <div className='absolute left-3.75 max-w-15 max-h-15 inset-0 rounded-full border border-primary border-t-transparent animate-spin'></div>
                    <div className='w-15 h-15 mx-auto mb-4 bg-white shadow-lg rounded-full flex items-center justify-center'>
                        <img src={favico} alt="icon" className='max-w-10' />
                    </div>

                    <div className='flex items-center justify-center gap-1 text-lg font-primary text-base-content'>
                        <span>Loading</span>
                        <span className='animate-bounce delay-0'>.</span>
                        <span className='animate-bounce delay-150'>.</span>
                        <span className='animate-bounce delay-300'>.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Loading;