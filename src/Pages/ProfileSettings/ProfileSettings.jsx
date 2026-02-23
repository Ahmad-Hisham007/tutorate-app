import React, { useContext, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../../Contexts/AuthProvider/AuthProvider';

import {
    LuUser,
    LuMail,
    LuPhone,
    LuMapPin,
    LuBookOpen,
    LuAward,
    LuDollarSign,
    LuClock,
    LuSave,
    LuX,
    LuPlus,
    LuTrash2,
    LuCamera,
    LuLock,
    LuMessageSquare,
    LuGraduationCap
} from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useClassOptions from '../../Hooks/useClassOptions';
import Loading from '../../Components/Loading/Loading';

const ProfileSettings = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [passwordData, setPasswordData] = useState({
        new: '',
        confirm: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const { classOptions } = useClassOptions();
    // React Hook Form
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            photoURL: '',
            location: '',
            bio: '',
            whatsapp: '',
            // Tutor specific
            qualifications: [],
            subjects: [],
            experience: '',
            hourlyRate: '',
            // Student specific
            preferredSubjects: [],
            class: ''
        }
    });

    // For dynamic fields
    const { fields: qualificationFields, append: appendQualification, remove: removeQualification } = useFieldArray({
        control,
        name: "qualifications"
    });

    const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({
        control,
        name: "subjects"
    });

    const { fields: preferredSubjectFields, append: appendPreferredSubject, remove: removePreferredSubject } = useFieldArray({
        control,
        name: "preferredSubjects"
    });

    // New subject input state
    const [newSubject, setNewSubject] = useState('');
    const [newPreferredSubject, setNewPreferredSubject] = useState('');

    // Fetch profile data with email query
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/profile?email=${user?.email}`);
            return response.data.data;
        },
        enabled: !!user?.email,
        onSuccess: (data) => {
            // Reset form with fetched data
            reset({
                name: data.name || '',
                phone: data.phone || '',
                photoURL: data.photoURL || '',
                location: data.location || '',
                bio: data.bio || '',
                whatsapp: data.whatsapp || '',
                qualifications: data.qualifications || [],
                subjects: data.subjects || [],
                experience: data.experience || '',
                hourlyRate: data.hourlyRate || '',
                preferredSubjects: data.preferredSubjects || [],
                class: data.class || ''
            });
        }
    });

    // Update profile mutation with email query
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.put(`/users/profile?email=${user?.email}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', user?.email]);
            toast.success('Profile updated successfully!');
        },
        onError: (error) => {
            toast.error('Failed to update profile: ' + error.message);
        }
    });


    const onSubmit = async (data) => {
        setIsSaving(true);
        try {
            await updateMutation.mutateAsync(data);

            // Update Firebase profile if name or photo changed
            if (data.name !== user.displayName || data.photoURL !== user.photoURL) {
                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.photoURL
                });
                // Refresh user in context
                setUser({ ...user, displayName: data.name, photoURL: data.photoURL });
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordData.new !== passwordData.confirm) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordData.new.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        try {
            setIsSaving(true);

            // Update password directly (user is already logged in)
            await updatePassword(auth.currentUser, passwordData.new);

            toast.success('Password updated successfully!');
            setPasswordData({ new: '', confirm: '' });
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setPasswordError('Please log out and log in again before changing password');
            } else {
                setPasswordError(error.message);
            }
        } finally {
            setIsSaving(false);
        }
    };


    const handleAddSubject = () => {
        if (newSubject.trim()) {
            appendSubject({ value: newSubject.trim() });
            setNewSubject('');
        }
    };

    const handleAddPreferredSubject = () => {
        if (newPreferredSubject.trim()) {
            appendPreferredSubject({ value: newPreferredSubject.trim() });
            setNewPreferredSubject('');
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-6">
                        <h1 className="text-2xl font-primary font-bold text-white flex items-center gap-2">
                            <LuUser className="text-3xl" />
                            Profile Settings
                        </h1>
                        <p className="text-white/80 text-sm mt-1">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 bg-gray-50">
                        <div className="flex overflow-x-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab('profile')}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'profile'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-base-content'
                                    }`}
                            >
                                Profile Information
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('security')}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'security'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-base-content'
                                    }`}
                            >
                                Security
                            </button>
                            {profile?.role === 'tutor' && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('professional')}
                                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'professional'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-600 hover:text-base-content'
                                        }`}
                                >
                                    Professional Info
                                </button>
                            )}
                            {profile?.role === 'student' && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('student')}
                                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'student'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-600 hover:text-base-content'
                                        }`}
                                >
                                    Student Preferences
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Profile Information Tab */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            {/* Profile Picture */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Profile Picture
                                </label>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.name}&background=random`}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                                        />
                                        <label
                                            htmlFor="profile-picture"
                                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                                        >
                                            <LuCamera className="text-sm" />
                                        </label>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>Upload a new profile picture</p>
                                        <p className="text-xs">JPG, PNG or GIF. Max 2MB</p>
                                    </div>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuUser className="inline mr-2" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuMail className="inline mr-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile?.email}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuPhone className="inline mr-2" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phone')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuMapPin className="inline mr-2" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        {...register('location')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="City, Area"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <FaWhatsapp className="inline mr-2 text-green-500" />
                                        WhatsApp Number
                                    </label>
                                    <input
                                        type="text"
                                        {...register('whatsapp')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="+8801XXXXXXXXX"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuMessageSquare className="inline mr-2" />
                                    Bio
                                </label>
                                <textarea
                                    {...register('bio')}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <LuX />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <LuSave />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="p-6">
                            <form onSubmit={handlePasswordChange}>
                                <h3 className="text-lg font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                                    <LuLock className="text-primary" />
                                    Change Password
                                </h3>

                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-base-content mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.new}
                                            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-base-content mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.confirm}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                            minLength="6"
                                        />
                                    </div>

                                    {passwordError && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-start gap-2">
                                            <span className="text-sm">{passwordError}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {isSaving ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Professional Info Tab (Tutor only) */}
                    {activeTab === 'professional' && profile?.role === 'tutor' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            {/* Experience & Rate */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuClock className="inline mr-2" />
                                        Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        {...register('experience')}
                                        min="0"
                                        step="0.5"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        <LuDollarSign className="inline mr-2" />
                                        Hourly Rate ($)
                                    </label>
                                    <input
                                        type="number"
                                        {...register('hourlyRate')}
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Qualifications */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuAward className="inline mr-2" />
                                    Qualifications
                                </label>
                                <div className="space-y-3">
                                    {qualificationFields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-3 gap-2 items-center">
                                            <input
                                                {...register(`qualifications.${index}.degree`)}
                                                placeholder="Degree"
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <input
                                                {...register(`qualifications.${index}.institution`)}
                                                placeholder="Institution"
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    {...register(`qualifications.${index}.year`)}
                                                    placeholder="Year"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeQualification(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <LuTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => appendQualification({ degree: '', institution: '', year: '' })}
                                        className="mt-2 px-4 py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                                    >
                                        <LuPlus />
                                        Add Qualification
                                    </button>
                                </div>
                            </div>

                            {/* Subjects */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuBookOpen className="inline mr-2" />
                                    Subjects you teach
                                </label>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {subjectFields.map((field, index) => (
                                            <span key={field.id} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm flex items-center gap-2">
                                                {field.value}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(index)}
                                                    className="hover:text-red-500"
                                                >
                                                    <LuX className="text-xs" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add a subject"
                                            value={newSubject}
                                            onChange={(e) => setNewSubject(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSubject}
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <LuX />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <LuSave />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Student Preferences Tab */}
                    {activeTab === 'student' && profile?.role === 'student' && (
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            {/* Class */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuGraduationCap className="inline mr-2" />
                                    Current Class/Grade
                                </label>
                                <select
                                    {...register('class')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Select Class/Grade</option>
                                    {classOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Preferred Subjects */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuBookOpen className="inline mr-2" />
                                    Preferred Subjects
                                </label>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {preferredSubjectFields.map((field, index) => (
                                            <span key={field.id} className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center gap-2">
                                                {field.value}
                                                <button
                                                    type="button"
                                                    onClick={() => removePreferredSubject(index)}
                                                    className="hover:text-red-500"
                                                >
                                                    <LuX className="text-xs" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add a preferred subject"
                                            value={newPreferredSubject}
                                            onChange={(e) => setNewPreferredSubject(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddPreferredSubject}
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <LuX />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <LuSave />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;