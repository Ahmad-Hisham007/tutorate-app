import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout/HomeLayout';
import Home from '../Pages/Home/Home';
import TutorsListing from '../Pages/Users/Tutors/TutorsListing/TutorsListing';
import TuitionsListing from '../Pages/Tuitions/TuitionsListing/TuitionsListing';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import TutorsProfile from '../Pages/Users/Tutors/TutorsProfile/TutorsProfile';
import TuitionsSingle from '../Pages/Tuitions/TuitionsSingle/TuitionsSingle';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "/tutors",
                element: <TutorsListing />
            },
            {
                path: "/tutors/:id",
                element: <TutorsProfile />
            },
            {
                path: "/tuitions",
                element: <TuitionsListing />
            },
            {
                path: "/tuitions/:id",
                element: <TuitionsSingle />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

export default Routes;