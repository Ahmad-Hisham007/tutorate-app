import React from 'react';

const DashboardFooter = () => {
    return (
        <footer className='bg-base-300 py-10 px-10 mt-auto'>
            <div className="flex flex-wrap md:justify-between text-center justify-center items-center font-body">
                <p>© 1994 - 2022 All Rights Reserved.</p>
                <ul className="flex flex-wrap items-center justify-center mt-2.5 md:mt-0 gap-2.5 [&_a]:hover:text-primary">
                    <li><a >Careers</a></li>
                    <li><a >Terms of use</a></li>
                    <li><a >Privacy policy</a></li>
                    <li><a >Cookie notice</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default DashboardFooter;