import React from 'react';
import { LuUser, LuMail, LuLock, LuPhone, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import Logo from "../../assets/tutorate-logo.png";
import img1 from "../../assets/img-01.png";
import LoginForm from './LoginForm';


const Login = () => {
    return (
        <section>
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                <div className="px-5 py-10 md:p-12 md:pt-30 flex items-center justify-center flex-col">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="font-primary text-4xl font-bold text-base-content mb-4">
                            Login To Your <span className="text-primary">#Account</span>
                        </h1>
                        <p className="text-base-content/70 text-lg">
                            Join our community of learners and educators
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm></LoginForm>

                </div>

                <div className='bg-accent flex items-center justify-start flex-col md:p-12 px-5 py-10 md:pt-30'>
                    <img src={Logo} alt="Logo" className='max-w-50 mb-12 md:mb-20' />
                    <img src={img1} alt="image illustration" />
                    <div className='w-full h-10 md:h-20'></div>
                    <h2 className='font-primary text-[32px] font-bold text-base-content mb-2.5 text-center'>
                        Yes! we’re making progress
                    </h2>
                    <p className='text-lg font-bold text-primary text-center'>
                        With every step of your journey
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Login;