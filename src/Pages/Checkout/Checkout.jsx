// src/Pages/Checkout/Checkout.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { LuArrowLeft, LuLock, LuCreditCard, LuUser, LuDollarSign } from 'react-icons/lu';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ applicationId, amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setCardError('');

        if (!stripe || !elements) {
            return;
        }

        try {
            // 1. Create payment intent
            const { data } = await axiosSecure.post(
                `/create-payment-intent?email=${user.email}`,
                { applicationId }
            );

            // 2. Confirm card payment
            const cardElement = elements.getElement(CardElement);
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: user.displayName,
                            email: user.email,
                        },
                    },
                }
            );

            if (error) {
                setCardError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                // 3. Notify backend of success
                await axiosSecure.post(`/payment/success?email=${user.email}`, {
                    applicationId,
                    paymentIntentId: paymentIntent.id,
                });

                onSuccess();
            }
        } catch (error) {
            setCardError(error.response?.data?.error || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-base-content mb-2">
                    Card Details
                </label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                        },
                    }}
                    className="p-3 bg-white border border-gray-300 rounded-lg"
                />
            </div>

            {cardError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {cardError}
                </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <LuLock className="text-primary mt-1" />
                <div className="text-sm text-gray-600">
                    <p className="font-medium">Test Mode</p>
                    <p>Use card: 4242 4242 4242 4242 - Any future date - Any CVC</p>
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full btn btn-primary"
            >
                {processing ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                    </>
                ) : (
                    <>Pay {amount} BDT</>
                )}
            </button>
        </form>
    );
};

const Checkout = () => {
    // const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { applicationId, amount, tuitionTitle } = location.state || {};

    useEffect(() => {
        if (!applicationId || !amount) {
            toast.error('Invalid payment request');
            navigate('/dashboard/applications');
        }
    }, [applicationId, amount, navigate]);

    const handleSuccess = () => {
        toast.success('Payment successful! Tutor approved.');
        navigate('/dashboard/my-tuitions');
    };

    if (!applicationId || !amount) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-base-content mb-6"
                >
                    <LuArrowLeft />
                    <span>Back</span>
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary p-6">
                        <h1 className="text-2xl font-primary font-bold text-white flex items-center gap-2">
                            <LuCreditCard className="text-3xl" />
                            Complete Payment
                        </h1>
                    </div>

                    <div className="p-6">
                        {/* Payment Summary */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h3 className="font-primary font-bold text-base-content mb-4">
                                Payment Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tuition:</span>
                                    <span className="font-medium">{tuitionTitle || 'Selected Tuition'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Amount:</span>
                                    <span className="font-medium text-primary">{amount} BDT</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span className="text-primary">{amount} BDT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stripe Elements */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                applicationId={applicationId}
                                amount={amount}
                                onSuccess={handleSuccess}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;