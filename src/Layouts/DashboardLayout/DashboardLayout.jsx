import React from 'react';
import DashboardFooter from './DashboardFooter';
import Header from './Header';
import { NavLink, Outlet } from 'react-router';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import useRole from '../../Hooks/useRole';
import { LuCopyPlus } from 'react-icons/lu';
import { RiBriefcase5Line } from 'react-icons/ri';


const studentMenus = <>
    <li>
        <NavLink to="/dashboard/my-tuitions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <MdOutlineLibraryBooks />
            <span className="is-drawer-close:hidden">My Tuitions</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/my-tuitions/post" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <LuCopyPlus />
            <span className="is-drawer-close:hidden">Post New Tuition</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/applications" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <RiBriefcase5Line />
            <span className="is-drawer-close:hidden">Tutor Applications</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/payments" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <TbCreditCardRefund />
            <span className="is-drawer-close:hidden">Payment History</span>
        </NavLink>
    </li>

</>

const DashboardLayout = () => {
    const { isStudent, isAdmin, isTutor, isLoading } = useRole();
    console.log(isStudent, isAdmin, isTutor, isLoading)
    return (
        <section className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <aside className="drawer-content min-h-screen flex flex-col justify-start">
                {/* Navbar */}
                <Header></Header>
                {/* Page content here */}
                <main className="p-4">
                    <Outlet></Outlet>
                </main>
                <DashboardFooter></DashboardFooter>
            </aside>

            <aside className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">

                        {/* List item */}
                        {isStudent ? studentMenus : ""}
                    </ul>
                </div>
            </aside>
        </section>
    );
};

export default DashboardLayout;