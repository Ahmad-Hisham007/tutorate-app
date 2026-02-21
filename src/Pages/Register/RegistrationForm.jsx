import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LuUser, LuMail, LuLock, LuPhone, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import { useState } from 'react';
import { PiChalkboardTeacherFill, PiStudentFill } from 'react-icons/pi';
import { Link, Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student');
    const { handleRegister } = useContext(AuthContext);
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
        // watch
    } = useForm({
        defaultValues: {
            role: 'student'
        }
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        const success = handleRegister(data);

        if (success) {
            // Reset the form after successful registration
            reset(); // This will reset all form fields to default values
            setSelectedRole('student'); // Reset the role state as well
            setIsAuthenticated(true)
        }

    };
    if (isAuthenticated) {
        return <Navigate Navigate to={`${location.state ? location.state : "/"}`
        }></Navigate >
    }

    return (
        <>
            {/* Registration Form */}
            <div className="bg-base-100 rounded-xl md:max-w-175 lg:max-w-125 max-w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Role Selection - Visual Tabs */}
                    <div className="mb-8">
                        <label className="block text-base-content/70 text-sm font-medium mb-3">
                            I want to register as
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Student Option */}
                            <button
                                type="button"
                                onClick={() => setSelectedRole('student')}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedRole === 'student'
                                    ? 'border-primary bg-primary/5'
                                    : 'border-base-content/10 hover:border-primary/30'
                                    }`}
                            >
                                <div className={`text-3xl mb-2 ${selectedRole === 'student' ? 'text-primary' : 'text-base-content'
                                    } flex justify-center items-center`}>
                                    <PiStudentFill />

                                </div>
                                <h3 className={`font-primary font-bold ${selectedRole === 'student' ? 'text-primary' : 'text-base-content'
                                    }`}>
                                    Student
                                </h3>
                                <p className="text-xs text-base-content/50 mt-1">
                                    Find tutors & learn
                                </p>
                            </button>

                            {/* Tutor Option */}
                            <button
                                type="button"
                                onClick={() => setSelectedRole('tutor')}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedRole === 'tutor'
                                    ? 'border-secondary bg-secondary/5'
                                    : 'border-base-content/10 hover:border-secondary/30'
                                    }`}
                            >
                                <div className={`text-3xl mb-2 ${selectedRole === 'tutor' ? 'text-secondary' : 'text-base-content'
                                    } flex justify-center items-center`}>
                                    <PiChalkboardTeacherFill />
                                </div>
                                <h3 className={`font-primary font-bold ${selectedRole === 'tutor' ? 'text-secondary' : 'text-base-content'
                                    }`}>
                                    Tutor
                                </h3>
                                <p className="text-xs text-base-content/50 mt-1">
                                    Teach & earn
                                </p>
                            </button>
                        </div>

                        {/* Hidden input for react-hook-form */}
                        <input
                            type="hidden"
                            {...register('role', { required: 'Please select a role' })}
                            value={selectedRole}
                        />
                        {errors.role && (
                            <p className="mt-2 text-sm text-secondary">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Form Fields Grid */}
                    <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="text-base-content/70 text-sm font-medium mb-2 hidden">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LuUser className="text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        }
                                    })}
                                    className="w-full pl-10 pr-4 py-3 border border-base-content/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-base-100 text-base-content"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-secondary">{errors.name.message}</p>
                            )}
                        </div>

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

                        {/* Phone */}
                        <div>
                            <label className="hidden text-base-content/70 text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LuPhone className="text-base-content/40" />
                                </div>
                                <input
                                    type="tel"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9+\-\s()]{10,}$/,
                                            message: 'Please enter a valid phone number'
                                        }
                                    })}
                                    className="w-full pl-10 pr-4 py-3 border border-base-content/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-base-100 text-base-content"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-secondary">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="hidden text-base-content/70 text-sm font-medium mb-2">
                                Photo URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdOutlineAddPhotoAlternate className="text-base-content/40" />
                                </div>
                                <input
                                    type="tel"
                                    {...register('photoURL')}
                                    className="w-full pl-10 pr-4 py-3 border border-base-content/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-base-100 text-base-content"
                                    placeholder="https://tinypng.com/profile.png"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-secondary">{errors.phone.message}</p>
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
                            <p className="mt-2 text-xs text-base-content/50">
                                Password must contain at least 8 characters, one uppercase, one lowercase and one number
                            </p>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start gap-3 py-4">
                            <input
                                type="checkbox"
                                {...register('terms', {
                                    required: 'You must accept the terms and conditions'
                                })}
                                className="mt-1 w-4 h-4 border border-base-content/30 rounded focus:ring-primary text-primary"
                                id="terms"
                            />
                            <label htmlFor="terms" className="text-sm text-base-content/70">
                                I agree to the{' '}
                                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                                    Privacy Policy
                                </a>
                            </label>
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
                                <span>Create Account</span>
                                <LuArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-base-content/70 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;