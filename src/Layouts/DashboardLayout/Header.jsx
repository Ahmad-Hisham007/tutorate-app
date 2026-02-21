import React, { useContext, useRef, useState } from 'react';
import Logo from '../../assets/tutorate-logo.png'
import { Link, useNavigate } from 'react-router';

import { LuCircleUser } from 'react-icons/lu';
import { MdCreditScore, MdLogout, MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoNewspaperOutline } from 'react-icons/io5';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { FaRegUser } from 'react-icons/fa6';

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
        <li><a className='flex items-center gap-3'><LuCircleUser /> Profile</a></li>
        <li><a className='flex items-center gap-3'><MdOutlineDashboardCustomize /> My tuition posts</a></li>
        <li><a className='flex items-center gap-3'><IoNewspaperOutline /> Tutor Applications</a></li>
        <li><a className='flex items-center gap-3'><MdCreditScore /> Payment History</a></li>
        <li><a className='flex items-center gap-3' onClick={handleLogout}><MdLogout /> Log-out</a></li>
    </>
    return (
        <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                {/* Sidebar toggle icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <div className='flex justify-between items-center w-full'>
                <div className="header-logo">
                    <Link to="/">
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
                        }} className="dropdown-content menu bg-base-100 rounded-b-box z-1 w-full min-w-60 shadow-sm p-7.5 inset-x-0 md:top-full top-18 space-y-3 text-base-content font-body [&_a:hover]:bg-transparent [&_a:hover]:text-primary [&_a]:p-0 [&_a]:text-base md:absolute fixed transition-all duration-300 left-auto right-0">
                            {studentProfileMenu}
                        </ul>
                    </details>
                </div>
            </div>
        </nav>
    );
};

export default Header;