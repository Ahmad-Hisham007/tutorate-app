import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';

const HomeLayout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet>

                </Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default HomeLayout;