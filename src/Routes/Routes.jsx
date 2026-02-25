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
import EmptyState from '../Components/EmptyState/EmptyState';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
import MyTuitions from '../Pages/MyTuitions/MyTuitions';
import ProtectedRoute from './ProtectedRoute';
import PostTuition from '../Pages/PostTuition/PostTuition';
import TutorApplications from '../Pages/TutorApplications/TutorApplications';
import PaymentsHistory from '../Pages/PaymentsHistory/PaymentsHistory';
import EditTuition from '../Pages/EditTuition/EditTuition';
import MyApplications from '../Pages/MyApplications/MyApplications';
import OngoingTuitions from '../Pages/OngoingTuitions/OngoingTuitions';
import RevenueHistory from '../Pages/RevenueHistory/RevenueHistory';
import Checkout from '../Pages/Checkout/Checkout';
import ManageUsers from '../Pages/ManageUsers/ManageUsers';
import ManageTutions from '../Pages/ManageTutions/ManageTutions';
import Reports from '../Pages/Reports/Reports';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "/tutors",
                element: <TutorsListing />,
                errorElement: <EmptyState type="tutors" />
            },
            {
                path: "/tutors/:id",
                element: <TutorsProfile />,
                errorElement: <ErrorBoundary />
            },
            {
                path: "/tuitions",
                element: <TuitionsListing />,
                errorElement: <EmptyState type="tuitions" />
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
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            // Routes for all loggedin user
            {
                path: 'myprofile',
                element: <Profile></Profile>
            },
            {
                path: "profile-settings",
                element: <ProfileSettings></ProfileSettings>
            },
            // Admin Routes
            {
                path: "manage-users",
                element: <ProtectedRoute allowedRoles={["admin"]}>
                    <ManageUsers></ManageUsers>
                </ProtectedRoute>
            },
            {
                path: "manage-tuitions",
                element: <ProtectedRoute allowedRoles={["admin"]}>
                    <ManageTutions></ManageTutions>
                </ProtectedRoute>
            },
            {
                path: "reports",
                element: <ProtectedRoute allowedRoles={["admin"]}>
                    <Reports></Reports>
                </ProtectedRoute>
            },
            // Tutor Routes
            {
                path: "my-applications",
                element: <ProtectedRoute allowedRoles={["tutor"]}>
                    <MyApplications></MyApplications>
                </ProtectedRoute>
            },
            {
                path: "ongoing-tuitions",
                element: <ProtectedRoute allowedRoles={["tutor"]}>
                    <OngoingTuitions></OngoingTuitions>
                </ProtectedRoute>
            },
            {
                path: "revenue-history",
                element: <ProtectedRoute allowedRoles={["tutor"]}>
                    <RevenueHistory></RevenueHistory>
                </ProtectedRoute>
            },
            {
                path: "ongoing-tuitions",
                element: <ProtectedRoute allowedRoles={["tutor"]}><OngoingTuitions /></ProtectedRoute>
            },
            // Student Routes
            {
                path: "my-tuitions",
                element: <ProtectedRoute allowedRoles={["student"]}><MyTuitions></MyTuitions></ProtectedRoute>
            },
            {
                path: "my-tuitions/post",
                element: <ProtectedRoute allowedRoles={["student"]}>
                    <PostTuition></PostTuition>
                </ProtectedRoute>
            },
            {
                path: "my-tuitions/edit/:id",
                element: <ProtectedRoute allowedRoles={["student"]}>
                    <EditTuition></EditTuition>
                </ProtectedRoute>
            },
            {
                path: "applications",
                element: <ProtectedRoute allowedRoles={["student"]}>
                    <TutorApplications></TutorApplications>
                </ProtectedRoute>
            },
            {
                path: "checkout",
                element: <ProtectedRoute allowedRoles={["student"]}><Checkout /></ProtectedRoute>
            },
            // Student & Tutor Routes
            {
                path: "payments",
                element: <ProtectedRoute allowedRoles={["student", "tutor"]}><PaymentsHistory /></ProtectedRoute>
            }
        ]
    }
])

export default Routes;