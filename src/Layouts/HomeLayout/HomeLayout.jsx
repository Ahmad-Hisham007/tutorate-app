import React, { useContext } from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Components/Loading/Loading';

const HomeLayout = () => {

    const { user, loading } = useContext(AuthContext);
    console.log(loading)
    if (loading) {
        return <Loading></Loading>
    }
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