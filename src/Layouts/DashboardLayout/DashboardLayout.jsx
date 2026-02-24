import React, { useContext } from 'react';
import DashboardFooter from './DashboardFooter';
import Header from './Header';
import { Link, NavLink, Outlet } from 'react-router';
import { IoHomeOutline } from 'react-icons/io5';
import { MdCreditScore, MdOutlineFactCheck, MdOutlineLibraryBooks } from 'react-icons/md';
import useRole from '../../Hooks/useRole';
import { LuBriefcaseBusiness, LuCopyPlus } from 'react-icons/lu';
import { FaEarDeaf } from 'react-icons/fa6';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { BsCreditCard2Front } from 'react-icons/bs';




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

            <BsCreditCard2Front className='text-xl' />

            <span className="is-drawer-close:hidden">Revenue History</span>
        </NavLink>
    </li>

</>

const DashboardLayout = () => {
    const { isStudent, isAdmin, isTutor, isLoading } = useRole();
    const { user } = useContext(AuthContext)
    console.log(isStudent, isAdmin, isTutor, isLoading)
    return (
        <section className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <aside className="drawer-content min-h-screen flex flex-col justify-start">
                {/* Navbar */}
                <Header></Header>
                {/* Page content here */}
                <main className="p-4 bg-gray-50">
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
                    </ul>
                </div>
            </aside>
        </section>
    );
};

export default DashboardLayout;