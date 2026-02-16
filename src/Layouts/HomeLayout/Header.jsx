import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/tutorate-logo.png'
import { CgMenuGridR } from 'react-icons/cg';
import { LuPhoneCall } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, NavLink, useLocation } from 'react-router';
import { MdLogin } from 'react-icons/md';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobileDepDropdownOpened, setIsMobileDepDropdownOpened] = useState(false)
    const mobileDepDropdown = useRef(null);
    const drawerCheckbox = useRef(null);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    // Inside component
    const location = useLocation();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDrawerOpen(false);
    }, [location]);

    useEffect(() => {
        if (drawerCheckbox.current) {
            drawerCheckbox.current.checked = false;

        }
    }, [location]);

    // const handleMobileDepDropdown = () => {
    //     console.log(isMobileDepDropdownOpened)
    //     setIsMobileDepDropdownOpened(!isMobileDepDropdownOpened);
    // }

    const primaryNav = <>
        <li>
            <NavLink to="/tutors">Tutors</NavLink>
        </li>
        <li>
            <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
            <NavLink to="/about">About</NavLink>
        </li>
        <li>
            <NavLink to="/tuitions">Tuitions</NavLink>
        </li>
    </>
    return (
        <header>
            {/* Header Area Start */}
            <div id="header-sticky" className="relative bg-transparent">
                <div className="mx-auto px-4 max-w-screen-2xl">
                    <div className="flex items-center justify-between py-4 lg:py-0">
                        {/* Logo Section */}
                        <div className="w-auto">
                            <div className="header-logo">
                                <Link to="/">
                                    <img
                                        className="logo-white md:w-32 w-24"
                                        src={Logo}
                                        alt="Logo"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Middle Navigation - Desktop */}
                        <div className="lg:w-2/12 xl:w-7/12 w-auto mt-1 lg:ms-10 hidden lg:block">
                            <div className="flex items-center justify-start gap-18">
                                {/* Categories Menu */}

                                <div className="flex items-center">
                                    <nav className="menu-item dropdown dropdown-hover ">
                                        <a tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer lg:py-10.5 py-6"><CgMenuGridR className='text-xl' />  <span className="text-base-content font-medium font-body hover:text-primary">   Departments</span> </a>
                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-b-box z-1 w-full min-w-60 shadow-sm p-7.5 left-0 right-0 inset-x-0 md:top-full top-18 space-y-3 text-base-content font-body [&_a:hover]:bg-transparent [&_a:hover]:text-primary [&_a]:p-0 [&_a]:text-base md:absolute fixed">
                                            <li><a>English & Grammer</a></li>
                                            <li><a>Science</a></li>
                                            <li><a>Biology</a></li>
                                            <li><a>Physics</a></li>
                                            <li><a>Mathemetics</a></li>
                                            <li><a>ICT</a></li>
                                        </ul>
                                    </nav>
                                </div>


                                {/* Main Navigation */}
                                <div className="hidden xl:flex items-center">
                                    <nav>
                                        <ul className="flex  [&_a]:transition-all [&_a]:duration-200 font-body text-base-content text-[17px] font-medium gap-10 [&_a.active]:text-primary [&_a:hover]:text-primary">
                                            {primaryNav}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Desktop */}
                        <div className="hidden lg:block lg:w-4/12">
                            <div className="flex items-center justify-end space-x-4">
                                {/* Phone Number */}
                                <div className="hidden lg:block">
                                    <a href="tel:+1234456789" className="flex items-center gap-3 text-base-content font-medium font-primary">
                                        <LuPhoneCall className='text-xl mt-0.5 text-primary' />
                                        <span>+1234 456 789</span>
                                    </a>
                                </div>
                                <hr className='h-5 bg-gray-300 w-px border-0' />
                                {/* CTA Button */}

                                <Link to="/register" className="bg-secondary hover:bg-transparent border border-secondary hover:border-base-content hover:text-base-content transition-all duration-200 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md shadow-stone-300 leading-none">
                                    Find Tutor
                                </Link>

                                <Link to="/login" className="hover:bg-secondary bg-transparent border hover:border-secondary border-base-content text-base-content transition-all duration-200 hover:text-white px-6 py-3.5 rounded-xl font-semibold leading-none shadow-md shadow-stone-300 flex items-center gap-2">
                                    <MdLogin /> Login
                                </Link>


                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="xl:hidden lg:w-7/12 w-auto">
                            <div className="drawer">
                                <input ref={drawerCheckbox} id="my-drawer-1" type="checkbox" className="drawer-toggle"
                                    onChange={handleDrawerToggle} />
                                <div className="drawer-content">
                                    {/* Page content here */}

                                    <label htmlFor="my-drawer-1" className="btn btn-circle swap swap-rotate [&_.swap-off]:opacity-0 ![&_.swap-active]:opacity-1 [&_.swap-active]:rotate-180  transition-all duration-300 *:text-xl bg-linear-to-r from-primary to-sky-200 border-0 w-7.5 h-7.5 ">

                                        {/* hamburger icon */}
                                        <FiMenu className={`${isDrawerOpen === false ? 'swap-active' : 'swap-off'}`} />


                                        {/* close icon */}
                                        <IoClose className={`${isDrawerOpen ? 'swap-active' : 'swap-off'}`} />

                                    </label>
                                </div>
                                <div className="drawer-side top-[unset] bottom-0 max-h-[calc(100vh-62px)]" >
                                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>

                                    <div className="menu bg-base-200 min-h-full w-80 px-8 py-6">

                                        {/* Sidebar content here */}
                                        <details ref={mobileDepDropdown} className="dropdown" onClick={() => setIsMobileDepDropdownOpened(!isMobileDepDropdownOpened)}>
                                            <summary className={`border rounded-full flex items-center px-4 gap-2 cursor-pointer py-3 transition-all duration-200 ${isMobileDepDropdownOpened ? "border-primary" : "border-stone-300"}`} >
                                                <CgMenuGridR className='text-xl' />
                                                <span className={` font-medium font-body hover:text-primary ${isMobileDepDropdownOpened ? "text-primary" : "text-base-content"}`} >
                                                    Departments
                                                </span>
                                                <span className={`ms-auto transition-all duration-300 *:text-xl bg-linear-to-r from-primary to-sky-200 border-0 w-6 h-6 flex items-center justify-center rounded-full ${isMobileDepDropdownOpened ? "rotate-180" : ""}`} >
                                                    <IoIosArrowDown />
                                                </span>
                                            </summary>

                                            <ul onClick={(e) => {
                                                if (e.target.tagName === "a" | e.target.tagName === "A") {
                                                    mobileDepDropdown.current?.removeAttribute('open');
                                                    setIsMobileDepDropdownOpened(!isMobileDepDropdownOpened);
                                                }
                                            }} className="dropdown-content menu bg-base-100 rounded-b-box z-1 w-full min-w-60 shadow-sm p-7.5 left-0 right-0 inset-x-0 md:top-full top-18 space-y-3 text-base-content font-body [&_a:hover]:bg-transparent [&_a:hover]:text-primary [&_a]:p-0 [&_a]:text-base md:absolute fixed transition-all duration-300">
                                                <li><a>English & Grammer</a></li>
                                                <li><a>Science</a></li>
                                                <li><a>Biology</a></li>
                                                <li><a>Physics</a></li>
                                                <li><a>Mathemetics</a></li>
                                                <li><a>ICT</a></li>
                                            </ul>
                                        </details>

                                        <ul className="flex mt-10 flex-col [&_a]:transition-all [&_a]:duration-200 font-body text-base-content text-base font-medium gap-0 [&_a.active]:text-primary [&_a:hover]:text-primary [&_li]:border-b [&_li]:border-stone-300 [&_a]:py-3 [&_a]:px-0">
                                            {primaryNav}
                                        </ul>

                                        {/* Phone Number */}
                                        <div className="flex flex-col items-stretch gap-5 mt-auto">
                                            <a href="tel:+1234456789" className="flex items-center gap-3 text-base-content font-medium font-primary">
                                                <LuPhoneCall className='text-2xl mt-0.5 text-primary' />
                                                <span className='text-xl'>+1234 456 789</span>
                                            </a>

                                            {/* CTA Button */}

                                            <Link to="/register" className="bg-secondary hover:bg-transparent border border-secondary hover:border-base-content hover:text-base-content transition-all duration-200 text-white px-6 py-3.5 rounded-xl font-bold shadow-md shadow-stone-300 leading-none">
                                                Find Tutor
                                            </Link>

                                            <Link to="/login" className="flex gap-2 items-center hover:bg-secondary bg-transparent border hover:border-secondary border-base-content text-base-content transition-all duration-200 hover:text-white px-6 py-3.5 rounded-xl font-bold leading-none shadow-md shadow-stone-300">
                                                <MdLogin /> Login
                                            </Link>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header Area End */}
        </header>
    );
};

export default Header;