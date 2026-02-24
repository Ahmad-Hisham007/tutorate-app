// src/Components/ApplyModal/ApplyModal.jsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-hot-toast';
import { LuSend, LuUser, LuMail, LuBookOpen, LuClock, LuDollarSign, LuMapPin } from 'react-icons/lu';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApplyModal = ({ isOpen, onClose, tuition, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // const applyModalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      qualifications: '',
      experience: '',
      expectedSalary: ''
    }
  });

  const onSubmit = async (data) => {

    try {
      const response = await axiosSecure.post(`/applications?email=${user.email}`, {
        tuitionId: tuition._id,
        qualifications: data.qualifications,
        experience: Number(data.experience),
        expectedSalary: Number(data.expectedSalary)
      });
      console.log('Server response:', response.data);
      if (response.data?.success) {
        // Success - only show success toast
        toast.success('Application submitted successfully!');

        // Reset form
        reset();

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Close modal
        onClose();
      } else {
        // If server returns success: false
        toast.error(response.data?.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application error:', error);
      console.error('Error response:', error.response?.data);

      // Error - only show error toast
      const errorMessage = error.response?.data?.error || 'Failed to submit application';
      toast.error(errorMessage);
    }
  };
  return (
    <>
      {/* Checkbox to control modal */}
      <input
        type="checkbox"
        id="apply-modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => { }} // Read-only
      />

      <div className="modal" role="dialog">
        <div className="modal-box max-h-9/12 overflow-y-auto max-w-lg w-full p-0 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-primary font-bold text-base-content">
              Apply for Tuition
            </h3>
          </div>

          {/* Tuition Summary */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h4 className="font-medium text-base-content mb-2">{tuition?.title}</h4>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <LuBookOpen className="text-primary" />
                <span>{tuition?.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <LuClock className="text-primary" />
                <span>{tuition?.schedule?.days}</span>
              </div>
              <div className="flex items-center gap-2">
                <LuDollarSign className="text-primary" />
                <span>{tuition?.minBudget} - {tuition?.maxBudget} BDT</span>
              </div>
              <div className="flex items-center gap-2">
                <LuMapPin className="text-primary" />
                <span>{tuition?.location}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Tutor Info (Read-only) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  <LuUser className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  <LuMail className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-50"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Qualifications <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('qualifications', { required: 'Qualifications are required' })}
                rows="3"
                className={`textarea textarea-bordered w-full ${errors.qualifications ? 'textarea-error' : ''}`}
                placeholder="e.g., BSc in Mathematics, 5 years teaching experience"
              />
              {errors.qualifications && (
                <p className="mt-1 text-sm text-secondary">{errors.qualifications.message}</p>
              )}
            </div>

            {/* Experience & Expected Salary */}
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
                  className={`input input-bordered w-full ${errors.experience ? 'input-error' : ''}`}
                  placeholder="e.g., 3"
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
                  className={`input input-bordered w-full ${errors.expectedSalary ? 'input-error' : ''}`}
                  placeholder="e.g., 5000"
                />
                {errors.expectedSalary && (
                  <p className="mt-1 text-sm text-secondary">{errors.expectedSalary.message}</p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <LuSend />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop click to close */}
        <label className="modal-backdrop" onClick={onClose}>Close</label>
      </div>
    </>
  );
};

export default ApplyModal;