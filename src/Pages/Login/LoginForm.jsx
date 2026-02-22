import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LuUser, LuMail, LuLock, LuPhone, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { PiChalkboardTeacherFill, PiStudentFill } from 'react-icons/pi';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // watch
    } = useForm();

    const onSubmit = async (data) => {
        console.log('Form Data:', data);
        // Handle registration logic here
        const response = await handleLogin(data);
        console.log(response)
        if (response.success) {
            // Reset the form after successful registration
            reset();
            toast.success("Login Successful")
            setIsAuthenticated(true)
        } else {
            toast.error(`Login failed ${response.error}`)
        }
    };
    const handleGoogleSubmit = async () => {
        const response = await handleGoogleLogin();
        console.log(response)
        if (response.success) {
            // Reset the form after successful registration
            toast.success("Login Successful")
            setIsAuthenticated(true)
        } else {
            toast.error(`Login failed ${response.error}`)
        }
    }
    if (isAuthenticated) {
        return <Navigate Navigate to={`${location.state ? location.state : "/"}`
        }></Navigate >
    }

    return (
        <>
            {/* Login Form */}
            <div className="bg-base-100 rounded-xl md:max-w-175 lg:max-w-125 max-w-full w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

                    {/* Form Fields Grid */}
                    <div className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="hidden text-base-content/70 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LuMail className="text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="w-full pl-10 pr-4 py-3 border border-base-content/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-base-100 text-base-content"
                                    placeholder="john@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-secondary">{errors.email.message}</p>
                            )}
                        </div>


                        {/* Password */}
                        <div>
                            <label className="hidden text-base-content/70 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LuLock className="text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'Must contain uppercase, lowercase and number'
                                        }
                                    })}
                                    className="w-full pl-10 pr-12 py-3 border border-base-content/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-base-100 text-base-content"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/60"
                                >
                                    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-secondary">{errors.password.message}</p>
                            )}
                        </div>


                        {errors.terms && (
                            <p className="text-sm text-secondary">{errors.terms.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-base-100 py-4 rounded-lg font-primary font-bold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-base-100 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Login</span>
                                <LuArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button >
                    {/* Login Link */}
                    <p className="text-center text-base-content/70 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                            Sign up
                        </Link>
                    </p>
                </form>
                <button className="w-full border-2 border-primary text-primary py-4 rounded-lg font-primary font-bold text-lg hover:border-primary/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-4" onClick={handleGoogleSubmit}>
                    <>
                        <span>Login</span>
                        <FaGoogle className="text-xl group-hover:translate-x-1 transition-transform" />
                    </>
                </button>
            </div>
        </>
    );
};

export default LoginForm;