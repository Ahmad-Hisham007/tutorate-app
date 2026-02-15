import React from 'react';
import { LuUser, LuMail, LuLock, LuPhone, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import RegistrationForm from './RegistrationForm';




const Register = () => {

    return (
        <section className="min-h-screen bg-base-100 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                            Create Your <span className="text-primary">Account</span>
                        </h1>
                        <p className="text-base-content/70 text-lg">
                            Join our community of learners and educators
                        </p>
                    </div>

                    {/* Registration Form */}
                    <RegistrationForm></RegistrationForm>

                    {/* Features Summary */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: '✓', text: 'Free Registration' },
                            { icon: '🔒', text: 'Secure Platform' },
                            { icon: '⚡', text: 'Instant Access' },
                            { icon: '🎓', text: 'Verified Tutors' }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-3">
                                <div className="text-2xl mb-1">{feature.icon}</div>
                                <p className="text-xs text-base-content/60">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;