import React from 'react';
import Logo from "../../assets/tutor-logo-light.png"
import { Link } from 'react-router';
import { FaFacebookF, FaRegPaperPlane, FaTwitch } from 'react-icons/fa6';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiPhoneCall, FiPrinter } from 'react-icons/fi';
import { BsEnvelope } from 'react-icons/bs';
import { RiWhatsappLine } from 'react-icons/ri';

const Footer = () => {
    return (
        <footer>
            <div className="bg-base-content text-white">
                <div className="max-w-330 mx-auto px-5">
                    <div className="grid gap-10 lg:grid-cols-12 py-15">
                        <div className="lg:col-span-7">
                            <strong>
                                <Link to="/" className='mb-4 block'>
                                    <img src={Logo} alt="Logo" className='w-44' />
                                </Link>
                            </strong>
                            <p className="tu-footerdescription">Tutorate is your personalized learning companion. Whether you need help with a tricky subject or want to explore advanced topics, our tutors provide one-on-one guidance tailored to your pace and goals.</p>
                            <ul className="flex gap-3 mt-6 [&_a:hover]:border-primary [&_a:hover]:bg-primary [&_a:hover]:transition-all [&_a:hover]:duration-200">
                                <li><a className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-teal-700" href="https://www.facebook.com/" target="_blank"><FaFacebookF /></a></li>
                                <li><a className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-teal-700" href="https://twitter.com/?lang=en" target="_blank"><FaTwitter /></a></li>
                                <li><a className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-teal-700" href="https://www.linkedin.com" target="_blank"><FaLinkedinIn /></a></li>
                                <li><a className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-teal-700" href="https://dribbble.com/" target="_blank"> <FaInstagram /> </a></li>
                                <li><a className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-teal-700" href="https://www.twitch.tv/" target="_blank"><FaTwitch />
                                </a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-5">
                            <h5 className="font-primary font-medium text-lg mb-4">Feel free to share your question</h5>
                            <ul className="space-y-3 [&_a:hover]:text-primary">
                                <li><a className='flex items-center gap-4 flex-wrap' href="tel:+8801799290220"><FiPhoneCall />(+88)01799290220<span className='opacity-55'>( Mon to Sun 9am - 11pm GMT )</span></a></li>
                                <li><a className='flex items-center gap-4 ' href="mailto:hello@youremailid.co.uk"><BsEnvelope />ahhisham413@gmail.com</a></li>
                                <li><a className='flex items-center gap-4 ' href="tel:+8801881213277"><FiPrinter />+880 18812 13277</a></li>
                                <li><a className='flex items-center gap-4 flex-wrap' href="tel:(+88)01799290220"><RiWhatsappLine />(+88)01799290220<span className='opacity-55'>( Mon to Sun 9am - 11pm GMT )</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className='w-full border-0 bg-primary opacity-20 h-px' />
                    <div className='grid lg:grid-cols-12 py-15 gap-10'>
                        <div className="lg:col-span-6">
                            <h5 className="font-primary font-medium text-lg mb-4">Useful links</h5>
                            <ul className="grid ms-5 lg:ms-0 lg:grid-cols-2 items-start [&_a]:relative [&_a]:before:absolute [&_a]:before:w-1 [&_a]:before:h-px [&_a]:before:bg-teal-600 [&_a]:before:content-[''] [&_a]:before:top-6/12 [&_a]:before:-left-4 [&_a]:hover:text-primary [&_a]:transition-all [&_a]:duration-200">
                                <li><a href="how-it-work.html">About</a></li>
                                <li><a href="search-listing.html">Success stories</a></li>
                                <li><a href="search-listing.html">Online class</a></li>
                                <li><a href="login.html">Join our community</a></li>
                                <li><a href="search-listing.html">Courses</a></li>
                                <li><a href="login.html">Sign in now</a></li>
                                <li><a href="search-listing.html">Programs &amp; degrees</a></li>
                                <li><a href="how-it-work.html">How it works</a></li>
                                <li><a href="search-listing.html">Learning materials</a></li>
                                <li><a href="index.html">F.A.Q</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-6 lg:flex">
                            <div className="tu-footernewsletter">
                                <h5 className="font-primary font-medium text-lg mb-4">Signup for newsletter</h5>
                                <p>Be the first to know about new course launches, exclusive discounts, and learning tips. Join our community of motivated learners today.</p>
                                <div className="flex items-stretch gap-3 w-full mt-4">
                                    <input id="email" type="text" placeholder="Enter your email" className="input text-base font-medium font-body w-full h-auto text-stone-400 border-0 outline-0 bg-[#3f5850bd] shadow-none" />
                                    <button role="btn" type='submit' className="bg-secondary p-4 text-lg text-base-content rounded"><FaRegPaperPlane /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3 bg-[#141f1b]">
                    <div className="max-w-330 mx-auto">
                        <div className="flex flex-wrap md:justify-between justify-center items-center font-body">
                            <p>© 1994 - 2022 All Rights Reserved.</p>
                            <ul className="flex flex-wrap items-center justify-center mt-2.5 md:mt-0 gap-2.5 [&_a]:hover:text-primary">
                                <li><a href="how-it-work.html">Careers</a></li>
                                <li><a href="how-it-work.html">Terms of use</a></li>
                                <li><a href="how-it-work.html">Privacy policy</a></li>
                                <li><a href="how-it-work.html">Cookie notice</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </footer >
    );
};

export default Footer;