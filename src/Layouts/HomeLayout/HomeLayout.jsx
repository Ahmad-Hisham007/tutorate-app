import React, { useContext } from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router';
import Footer from './Footer';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Components/Loading/Loading';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';

const HomeLayout = () => {
    const location = useLocation();

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>
    }
    return (
        <>
            <ScrollToTop />
            <Header></Header>
            <main className={`max-w-full ${location.pathname === "/" ? "" : "overflow-x-hidden"}`} >
                <Outlet>

                </Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default HomeLayout;