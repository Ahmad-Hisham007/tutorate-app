import React, { useContext, useEffect } from 'react';
import DashboardFooter from './DashboardFooter';
import Header from './Header';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { IoHomeOutline, IoStatsChartSharp } from 'react-icons/io5';
import { MdCreditScore, MdOutlineFactCheck, MdOutlineLibraryBooks, MdOutlineManageAccounts } from 'react-icons/md';
import useRole from '../../Hooks/useRole';
import { LuBriefcaseBusiness, LuCopyPlus, LuFileStack } from 'react-icons/lu';
import { FaEarDeaf } from 'react-icons/fa6';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { BsCreditCard2Front } from 'react-icons/bs';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';




const studentMenus = <>
    <li>
        <NavLink to="/dashboard/my-tuitions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Tuitions">

            <MdOutlineLibraryBooks className='text-xl' />
            <span className="is-drawer-close:hidden">My Tuitions</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/my-tuitions/post" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="New Tuition">

            <LuCopyPlus className='text-xl' />
            <span className="is-drawer-close:hidden">Post New Tuition</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/applications" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Applications">

            <LuBriefcaseBusiness className='text-xl' />

            <span className="is-drawer-close:hidden">Tutor Applications</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/payments" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments ">

            <MdCreditScore className='text-xl' />
            <span className="is-drawer-close:hidden">Payment History</span>
        </NavLink>
    </li>

</>
const tutorMenus = <>
    <li>
        <NavLink to="/dashboard/my-applications" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Applications">

            <MdOutlineLibraryBooks className='text-xl' />
            <span className="is-drawer-close:hidden">My Applications</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/ongoing-tuitions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Ongoing Tuitions">

            <MdOutlineFactCheck className='text-xl' />
            <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/revenue-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Revenue History">

            <MdCreditScore className='text-xl' />
            <span className="is-drawer-close:hidden">Revenue History</span>
        </NavLink>
    </li>

</>

const adminMenus = <>
    <li>
        <NavLink to="/dashboard/manage-tuitions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Tuitions">

            <LuFileStack className='text-xl' />

            <span className="is-drawer-close:hidden">Manage Tuitions</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">

            <MdOutlineManageAccounts className='text-xl' />

            <span className="is-drawer-close:hidden">Manage Users</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/reports" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Reports">

            <IoStatsChartSharp className='text-xl' />

            <span className="is-drawer-close:hidden">Platform Reports</span>
        </NavLink>
    </li>

</>

const DashboardLayout = () => {
    const { isStudent, isAdmin, isTutor } = useRole();
    const { user } = useContext(AuthContext)
    const location = useLocation();

    useEffect(() => {
        const drawerCheckbox = document.getElementById('my-drawer-4');
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    }, [location.pathname]);

    return (
        <section className="drawer lg:drawer-open">
            <ScrollToTop />
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <aside className="drawer-content min-h-screen flex flex-col justify-start">
                {/* Navbar */}
                <Header></Header>
                {/* Page content here */}
                <main>
                    <Outlet></Outlet>
                </main>
                <DashboardFooter></DashboardFooter>
            </aside>

            <aside className="drawer-side overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 shadow-md! !is-drawer-open:shadow-md is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow gap-4 [&_a.active]:text-primary [&_a.active]:bg-primary/10">
                        <Link to="/dashboard/myprofile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4" data-tip="Profile">

                            <img src={user.photoURL} className='w-10 h-10 object-cover rounded-full' />

                            <span className="is-drawer-close:hidden">{`Hi, ${user.displayName}`}</span>
                        </Link>
                        {/* List item */}
                        {isStudent ? studentMenus : ""}
                        {isTutor ? tutorMenus : ""}
                        {isAdmin ? adminMenus : ""}
                    </ul>
                </div>
            </aside>
        </section>
    );
};

export default DashboardLayout;