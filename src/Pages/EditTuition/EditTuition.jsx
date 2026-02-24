// src/Pages/Tuitions/EditTuition/EditTuition.jsx
import React, { useContext, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import {
    LuBookOpen,
    LuDollarSign,
    LuMapPin,
    LuCalendar,
    LuUsers,
    LuClock,
    LuFileText,
    LuArrowLeft,
    LuSave,
    LuPlus,
    LuTrash2,
    LuBriefcase,
    LuGraduationCap,
    LuAward,
    LuListChecks,
    LuClipboardList,
} from 'react-icons/lu';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useSubjectOptions from '../../Hooks/useSubjectOptions';
import useClassOptions from '../../Hooks/useClassOptions';
import Forbidden from '../../Components/ForbiddenError/ForbiddenError';
import Loading from '../../Components/Loading/Loading';
import NotFound from '../../Components/NotFound/NotFound';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const EditTuition = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();
    const { subjectOptions } = useSubjectOptions();
    const { classOptions } = useClassOptions();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: '',
            institution: '',
            location: '',
            area: '',
            type: 'part-time',
            mode: 'on-site',
            subject: '',
            class: '',
            minBudget: '',
            maxBudget: '',
            budgetType: 'BDT',
            schedule: {
                days: '',
                hours: '',
                flexible: false,
                startDate: '',
                duration: ''
            },
            requirements: [],
            qualifications: [],
            responsibilities: [],
            benefits: [],
            students: '1',
            gender: 'any',
            experience: '',
            education: '',
            description: '',
            badge: '',
            badgeColor: 'secondary',
            slots: 1,
            applicationDeadline: '',
        }
    });

    // For dynamic arrays
    const { fields: requirementFields, append: appendRequirement, remove: removeRequirement } = useFieldArray({
        control,
        name: "requirements"
    });

    const { fields: qualificationFields, append: appendQualification, remove: removeQualification } = useFieldArray({
        control,
        name: "qualifications"
    });

    const { fields: responsibilityFields, append: appendResponsibility, remove: removeResponsibility } = useFieldArray({
        control,
        name: "responsibilities"
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: "benefits"
    });

    // Fetch tuition data with TanStack Query
    const { data: tuition, isLoading, error } = useQuery({
        queryKey: ['tuition', id, user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/tuitions/${id}/student-view?email=${user?.email}`);
            return response.data.data;
        },
        enabled: !!id && !!user?.email,
    });

    // Reset form when data is fetched
    useEffect(() => {
        if (tuition) {
            // Format dates for input fields
            const formattedData = {
                ...tuition,
                schedule: {
                    days: tuition.schedule?.days || '',
                    hours: tuition.schedule?.hours || '',
                    flexible: tuition.schedule?.flexible || false,
                    startDate: tuition.schedule?.startDate ? tuition.schedule.startDate.split('T')[0] : '',
                    duration: tuition.schedule?.duration || ''
                },
                applicationDeadline: tuition.applicationDeadline ? tuition.applicationDeadline.split('T')[0] : '',
                minBudget: tuition.minBudget?.toString() || '',
                maxBudget: tuition.maxBudget?.toString() || '',
                slots: tuition.slots?.toString() || '1',
            };
            reset(formattedData);
        }
    }, [tuition, reset]);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.put(`/tuitions/${id}?email=${user?.email}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myTuitions', user?.email]);
            queryClient.invalidateQueries(['tuition', id, user?.email]);
            toast.success('Tuition updated successfully!');
            navigate('/dashboard/my-tuitions');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update tuition');
        }
    });


    const onSubmit = async (data) => {
        try {
            // Format the data for API
            const tuitionData = {
                ...data,
                minBudget: Number(data.minBudget),
                maxBudget: Number(data.maxBudget),
                slots: Number(data.slots),
                schedule: {
                    ...data.schedule,
                    startDate: data.schedule.startDate ? new Date(data.schedule.startDate) : null
                },
                applicationDeadline: data.applicationDeadline ? new Date(data.applicationDeadline) : null,
                updatedAt: new Date()
            };

            await updateMutation.mutateAsync(tuitionData);
        } catch (error) {
            console.error('Error updating tuition:', error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error?.response?.status === 403) {
        return <Forbidden />;
    }
    if (error?.response?.status === 404) {
        return <NotFound />;
    }
    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-base-content mb-4"
                    >
                        <LuArrowLeft />
                        <span>Back to My Tuitions</span>
                    </button>
                    <h1 className="text-3xl font-primary font-bold text-base-content">
                        Edit Tuition Post
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Update your tuition requirements below
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuFileText className="text-primary" />
                            Basic Information
                        </h2>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Tuition Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('title', { required: 'Title is required' })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., Physics Teacher for College Level"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-secondary">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Institution/Organization Name
                                </label>
                                <input
                                    type="text"
                                    {...register('institution')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Notre Dame College"
                                />
                            </div>

                            {/* Type & Mode */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Job Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('type', { required: 'Job type is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="weekend">Weekend</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Teaching Mode <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('mode', { required: 'Teaching mode is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="on-site">On-site</option>
                                        <option value="online">Online</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subject & Class Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuBookOpen className="text-primary" />
                            Subject & Class Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('subject', { required: 'Subject is required' })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select Subject</option>
                                    {subjectOptions.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-secondary">{errors.subject.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Class/Grade <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('class', { required: 'Class is required' })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.class ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select Class</option>
                                    {classOptions.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                                {errors.class && (
                                    <p className="mt-1 text-sm text-secondary">{errors.class.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuMapPin className="text-primary" />
                            Location Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    City/District <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('location', { required: 'Location is required' })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., Dhaka"
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-secondary">{errors.location.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Area/Location
                                </label>
                                <input
                                    type="text"
                                    {...register('area')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Motijheel"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Budget Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuDollarSign className="text-primary" />
                            Budget & Salary
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Min Budget (BDT) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('minBudget', {
                                        required: 'Minimum budget is required',
                                        min: { value: 500, message: 'Minimum 500 BDT' }
                                    })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.minBudget ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., 1000"
                                />
                                {errors.minBudget && (
                                    <p className="mt-1 text-sm text-secondary">{errors.minBudget.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Max Budget (BDT) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('maxBudget', {
                                        required: 'Maximum budget is required',
                                        min: { value: 500, message: 'Minimum 500 BDT' }
                                    })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.maxBudget ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., 1500"
                                />
                                {errors.maxBudget && (
                                    <p className="mt-1 text-sm text-secondary">{errors.maxBudget.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Rate
                                </label>
                                <select
                                    {...register('budgetType')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="BDT">BDT/hour</option>
                                    <option value="USD">USD/hour</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuClock className="text-primary" />
                            Schedule & Timing
                        </h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Days <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register('schedule.days', { required: 'Schedule days are required' })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.schedule?.days ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="e.g., Sunday to Thursday"
                                    />
                                    {errors.schedule?.days && (
                                        <p className="mt-1 text-sm text-secondary">{errors.schedule.days.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Hours
                                    </label>
                                    <input
                                        type="text"
                                        {...register('schedule.hours')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="e.g., 8:00 AM - 3:00 PM"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register('schedule.startDate')}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        {...register('schedule.duration')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="e.g., 6 months, Permanent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('schedule.flexible')}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    id="flexible"
                                />
                                <label htmlFor="flexible" className="text-sm text-gray-600">
                                    Flexible schedule available
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Requirements Section - Dynamic Arrays */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            <LuClipboardList className="text-primary" />
                            Requirements & Qualifications
                        </h2>

                        {/* Requirements */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-base-content mb-2">
                                <LuListChecks className="inline mr-2" />
                                Requirements
                            </label>
                            <div className="space-y-3">
                                {requirementFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`requirements.${index}`)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter requirement"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <LuTrash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => appendRequirement('')}
                                    className="mt-2 px-4 py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                                >
                                    <LuPlus />
                                    Add Requirement
                                </button>
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
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`qualifications.${index}`)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter qualification"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeQualification(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <LuTrash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => appendQualification('')}
                                    className="mt-2 px-4 py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                                >
                                    <LuPlus />
                                    Add Qualification
                                </button>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-base-content mb-2">
                                <LuBriefcase className="inline mr-2" />
                                Responsibilities
                            </label>
                            <div className="space-y-3">
                                {responsibilityFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`responsibilities.${index}`)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter responsibility"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeResponsibility(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <LuTrash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => appendResponsibility('')}
                                    className="mt-2 px-4 py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                                >
                                    <LuPlus />
                                    Add Responsibility
                                </button>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Benefits & Facilities
                            </label>
                            <div className="space-y-3">
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`benefits.${index}`)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter benefit"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeBenefit(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <LuTrash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => appendBenefit('')}
                                    className="mt-2 px-4 py-2 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                                >
                                    <LuPlus />
                                    Add Benefit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-primary font-bold text-base-content mb-4 flex items-center gap-2">
                            Additional Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuUsers className="inline mr-2" />
                                    Number of Students
                                </label>
                                <input
                                    type="number"
                                    {...register('students')}
                                    min="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Default: 1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Available Slots
                                </label>
                                <input
                                    type="number"
                                    {...register('slots')}
                                    min="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Number of tutors needed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Preferred Tutor Gender
                                </label>
                                <select
                                    {...register('gender')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="any">Any</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Required Experience
                                </label>
                                <input
                                    type="text"
                                    {...register('experience')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., 3+ years"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuGraduationCap className="inline mr-2" />
                                    Required Education
                                </label>
                                <input
                                    type="text"
                                    {...register('education')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Master's Degree"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Badge (Optional)
                                </label>
                                <input
                                    type="text"
                                    {...register('badge')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., URGENT, FEATURED"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Badge Color
                                </label>
                                <select
                                    {...register('badgeColor')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="accent">Accent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    <LuCalendar className="inline mr-2" />
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    {...register('applicationDeadline')}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Full Description
                            </label>
                            <textarea
                                {...register('description')}
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Write a detailed description of the tuition opportunity..."
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <LuSave />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTuition;