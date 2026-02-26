import React, { useContext, useRef, useState } from 'react';
import Logo from '../../assets/tutorate-logo.png'
import { Link, NavLink, useNavigate } from 'react-router';

import { LuCircleUser } from 'react-icons/lu';
import { MdCreditScore, MdLogout, MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoNewspaperOutline } from 'react-icons/io5';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { FaRegUser } from 'react-icons/fa6';
import { RiSidebarUnfoldLine } from 'react-icons/ri';

const Header = () => {
    const profileDropdown = useRef(null);
    const [isProfileDropDownOpened, setIsProfileDropDownOpened] = useState(false);
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut().then(() => {
            navigate('/login');
            toast.success('Logout Successful');
            return;
        }).catch((error) => {
            toast.error(error.message);
        });
    }
    const studentProfileMenu = <>
        <li><NavLink to="/dashboard/myprofile" className='flex items-center gap-3'><LuCircleUser /> Profile</NavLink></li>
        <li><NavLink to="/dashboard/profile-settings" className='flex items-center gap-3'><MdCreditScore /> Edit Profile</NavLink></li>
        <li><NavLink className='flex items-center gap-3' onClick={handleLogout}><MdLogout /> Log-out</NavLink></li>
    </>
    return (
        <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn w-auto! px-0! btn-rounded rounded-full btn-ghost">
                {/* Sidebar toggle icon */}
                <RiSidebarUnfoldLine className='text-base p-2.5 w-10 h-10 bg-white shadow-lg rounded-full' />

            </label>
            <div className='flex justify-between items-center w-full ms-5'>
                <div className="header-logo">
                    <Link to="/dashboard">
                        <img
                            className="logo-white md:w-32 w-24"
                            src={Logo}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <details ref={profileDropdown} className="dropdown relative" onClick={() => setIsProfileDropDownOpened(!isProfileDropDownOpened)}>
                        <summary className={`border rounded-full flex items-center  gap-2 cursor-pointer justify-center w-10 h-10 transition-all duration-200 ${isProfileDropDownOpened ? "border-primary text-primary" : "border-stone-300 text-base-content"}`} >

                            <FaRegUser />
                        </summary>

                        <ul onClick={(e) => {
                            if (e.target.tagName === "a" | e.target.tagName === "A") {
                                profileDropdown.current?.removeAttribute('open');
                                setIsProfileDropDownOpened(!isProfileDropDownOpened);
                            }
                        }} className="dropdown-content menu bg-base-100 rounded-b-box z-1 w-full min-w-60 shadow-sm p-3 rounded-xl inset-x-0 md:top-full top-18 space-y-3 text-base-content font-body [&_a:hover]:bg-transparent [&_a:hover]:text-primary [&_a]:text-base md:absolute fixed transition-all duration-300 left-auto right-0 [&_a.active]:text-primary [&_a.active]:bg-primary/10">
                            {studentProfileMenu}
                        </ul>
                    </details>
                </div>
            </div>
        </nav>
    );
};

export default Header;