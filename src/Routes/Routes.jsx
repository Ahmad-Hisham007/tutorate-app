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
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Profile from '../Pages/Profile/Profile';
import ProfileSettings from '../Pages/ProfileSettings/ProfileSettings';

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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            // Routes for all loggedin user
            {
                path: '/myprofile',
                element: <Profile></Profile>
            },
            {
                path: "/profile-settings",
                element: <ProfileSettings></ProfileSettings>
            },
            // Admin Routes
            {
                path: "/users"
            },
            {
                path: "/manage-tuitions"
            },
            {
                path: "reports"
            },
            // Tutor Routes
            {
                path: "/my-applications"
            },
            {
                path: "/ongoing-tuitions"
            },
            {
                path: "/revenue-history"
            },
            // Student Routes
            {
                path: "/my-tuitions"
            },
            {
                path: "/my-tuitions/post"
            },
            {
                path: "/applications"
            },
            {
                path: "/payments"
            }
        ]
    }
])

export default Routes;