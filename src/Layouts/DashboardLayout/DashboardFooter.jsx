import React from 'react';

const DashboardFooter = () => {
    return (
        <footer className='bg-base-300 py-10 px-10'>
            <div className="flex flex-wrap md:justify-between justify-center items-center font-body">
                <p>© 1994 - 2022 All Rights Reserved.</p>
                <ul className="flex flex-wrap items-center justify-center mt-2.5 md:mt-0 gap-2.5 [&_a]:hover:text-primary">
                    <li><a href="how-it-work.html">Careers</a></li>
                    <li><a href="how-it-work.html">Terms of use</a></li>
                    <li><a href="how-it-work.html">Privacy policy</a></li>
                    <li><a href="how-it-work.html">Cookie notice</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default DashboardFooter;