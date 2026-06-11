import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LuUser, LuMail, LuLock, LuPhone, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { PiChalkboardTeacherFill, PiStudentFill } from 'react-icons/pi';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, handleGoogleLogin, resetPassword, user } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [sendingReset, setSendingReset] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        // watch
    } = useForm();

    const onSubmit = async (data) => {

        // Handle registration logic here
        const response = await handleLogin(data);

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

        if (response.success) {
            toast.success("Login Successful");
            setIsAuthenticated(true);
        } else {
            if (response.code === "USER_NOT_FOUND") {
                toast.error("No account found! Please register first.");
                setTimeout(() => navigate('/register'), 2000);
            } else {
                toast.error(`Login failed: ${response.error}`);
            }
        }
    }

    //  Password Reset Handler

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setSendingReset(true);

        try {
            // Trigger Firebase's native transactional email sequence
            await resetPassword(resetEmail);
            toast.success("A secure reset link has been sent to your email inbox!");
            setIsForgotModalOpen(false);
            setResetEmail('');
        } catch (error) {
            console.error(error);
            // Handle native Firebase error codes cleanly
            if (error.code === 'auth/user-not-found') {
                toast.error("No registered account found with this email.");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Please enter a valid email address structure.");
            } else {
                toast.error("Failed to send reset link. Please check your network.");
            }
        } finally {
            setSendingReset(false);
        }
    };
    if (isAuthenticated) {
        return <Navigate to={`${location.state ? location.state : "/dashboard"}`
        }></Navigate >
    }
    if (user) {
        return <Navigate to={`${location.state ? location.state : "/dashboard"}`
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
                        {/* Password Reset */}
                        <div className="flex justify-start mt-1">
                            <button
                                type="button"
                                onClick={() => setIsForgotModalOpen(true)}
                                className="text-xs font-semibold text-primary hover:text-base-content cursor-pointer transition-colors"
                            >
                                Forgot Password?
                            </button>
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

                {/* Password Reset Popup */}

                {isForgotModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-content/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-base-content/10 animate-fadeIn">

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-black text-base-content">
                                    Recover Account Access
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-xs text-base-content/70 mb-5">
                                Provide your registered login email. Firebase will dispatch an authenticated password rewrite link securely.
                            </p>

                            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="modal-email"
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="name@domain.com"
                                        className="w-full px-4 py-2.5 rounded-xl border border-base-content/20 bg-gray-50 text-sm text-base-content focus:outline-none focus:border-primary "
                                    />
                                </div>

                                <div className="flex gap-3 justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-base-content/70 bg-gray-100 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sendingReset}
                                        className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-base-content disabled:bg-gray-400 min-w-25 flex justify-center items-center"
                                    >
                                        {sendingReset ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            "Send Link"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginForm;