import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { LuX, LuSave } from 'react-icons/lu';

const UpdateApplicationModal = ({ isOpen, onClose, application, onSuccess }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            qualifications: application?.qualifications || '',
            experience: application?.experience || '',
            expectedSalary: application?.expectedSalary || ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axiosSecure.put(`/applications/${application._id}?email=${user.email}`, {
                qualifications: data.qualifications,
                experience: Number(data.experience),
                expectedSalary: Number(data.expectedSalary)
            });

            if (response.data.success) {
                toast.success('Application updated successfully!');
                onSuccess?.();
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to update application');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

                <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto z-10">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h3 className="text-xl font-primary font-bold text-base-content">
                            Update Application
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <LuX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Qualifications <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register('qualifications', { required: 'Qualifications are required' })}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.qualifications ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.qualifications && (
                                <p className="mt-1 text-sm text-secondary">{errors.qualifications.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Experience (years) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('experience', {
                                        required: 'Experience is required',
                                        min: { value: 0, message: 'Invalid experience' }
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.experience ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.experience && (
                                    <p className="mt-1 text-sm text-secondary">{errors.experience.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Expected Salary (BDT) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('expectedSalary', {
                                        required: 'Expected salary is required',
                                        min: { value: 500, message: 'Minimum 500 BDT' }
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.expectedSalary ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.expectedSalary && (
                                    <p className="mt-1 text-sm text-secondary">{errors.expectedSalary.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <LuSave />
                                        <span>Update</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateApplicationModal;