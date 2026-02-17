import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPhone, FaClock, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const MainContactSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
        toast.success('Message sent successfully!');
        reset();
    };
    return (
        <section className="pt-16 md:pt-24">

            <div className="max-w-6xl mx-auto px-4 md:px-0">
                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 lg:mb-16">
                    {/* Hours Card */}
                    <div className="bg-slate-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                            <FaClock className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-primary font-bold mb-4">Opening Hours</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>Mon - Fri: 9 AM - 6 PM</p>
                            <p>Saturday: 9 AM - 4 PM</p>
                            <p className="text-primary font-medium">Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-slate-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                            <FaPhone className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-primary font-bold mb-4">Phone Numbers</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>+880 18812 13277</p>
                            <p>+880 17992 90229</p>
                            <p className="text-primary font-medium">24/7 Support</p>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-slate-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                            <FaMapMarkerAlt className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-primary font-bold mb-4">Our Location</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>300, Char Bishwanath</p>
                            <p>Bashail, Munshiganj</p>
                            <p className="text-primary font-medium">Bangladesh</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map & Form Section */}
            <div className="py-17 md:py-22 bg-slate-50">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-0">
                    {/* Left Column - Map */}
                    <div className="space-y-6">
                        <div className="bg-linear-to-br from-accent to-amber-100 rounded-2xl md:p-8 p-4">
                            <div className='overflow-hidden h-100 lg:h-120 mb-8'>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.0037746845944!3d40.72176677933099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598bd3a3b7a1%3A0x3b5f7b7b7b7b7b7b!2s400%20Broome%20St%2C%20New%20York%2C%20NY%2010013!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Tuition Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-2xl p-6">
                                <h4 className="text-lg font-primary font-bold mb-4">Follow Us</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaFacebookF />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaTwitter />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaLinkedinIn />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-primary font-bold mb-2">
                            Get In <span className="text-primary">Touch</span>
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Full Name <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    {...register('fullName', {
                                        required: 'Full name is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Name must be at least 3 characters'
                                        }
                                    })}
                                />
                                {errors.fullName && (
                                    <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Email Address <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    {...register('email', {
                                        required: 'Email address is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    How Can We Help? <span className="text-primary">*</span>
                                </label>
                                <textarea
                                    rows="5"
                                    placeholder="Write Your Message"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    {...register('message', {
                                        required: 'Message is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Message must be at least 10 characters'
                                        }
                                    })}
                                ></textarea>
                                {errors.message && (
                                    <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-primary font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                            >
                                Send Message
                            </button>
                        </form>

                        {/* Alternative Contact */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-4 text-gray-600">
                                <FaEnvelope className="text-primary" />
                                <span>support@tuition.com</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default MainContactSection;