import {useState} from "react";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm.jsx";
import {IdentityService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

export const BillingTab = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const stripePromise = loadStripe("pk_test_51RhGXsR0zLfhT2uZGcgcyLPmCNOAPOdUtPkfL28yqoaXtgWPyBec035bdgFljBNlhuQZRDdYw7DTGnAftHSpg3FA00fvEb4HI0");

    const handleClick = async (plan) => {
        // Call backend to create PaymentIntent
        const response = await axios.post(IdentityService.payment, {
            plan: plan,
        }, {headers: {
            Authorization: `Bearer ${getToken()}`
            }});
        setClientSecret(response.data);
        setModalOpen(true);
    };

    const billingData = {
        plan: 'Free Plan',
        nextBilling: 'Unlimited',
        amount: '$0.00',
        method: 'None',
        usage: {
            events: 50,
            limit: 1000,
            percentage: 5
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Billing & Usage</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Plan</span>
                            <span className="font-medium text-gray-100">{billingData.plan}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Next Billing</span>
                            <span className="font-medium text-gray-100">{billingData.nextBilling}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Amount</span>
                            <span className="font-medium text-gray-100">{billingData.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Payment Method</span>
                            <span className="font-medium text-gray-100">{billingData.method}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Events Tracked</span>
                                    <span
                                        className="font-medium text-gray-100">{billingData.usage.events.toLocaleString()} / {billingData.usage.limit.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{width: `${billingData.usage.percentage}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mt-2">
                        <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Projects Tracked</span>
                                    <span
                                        className="font-medium text-gray-100">{billingData.usage.events.toLocaleString()} / {billingData.usage.limit.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{width: `${billingData.usage.percentage}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Plans Section */}
            <div className="pt-8 border-t border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* FREE Plan */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 relative">
                        <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-white mb-2">FREE</h4>
                            <div className="text-3xl font-bold text-white mb-1">$0</div>
                            <div className="text-gray-400 text-sm">per month</div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                1K Monthly Events
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                1 Project
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                Less Realtime Features
                            </div>
                        </div>

                        <button
                            className="w-full py-3 px-4 bg-gray-600 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                            disabled
                        >
                            Current Plan
                        </button>
                    </div>

                    {/* PRO Plan */}
                    <div className="bg-gray-800 rounded-xl border border-blue-500 p-6 relative transform scale-105">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Most Popular
                        </span>
                        </div>

                        <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-white mb-2">PRO</h4>
                            <div className="text-3xl font-bold text-white mb-1">$100</div>
                            <div className="text-gray-400 text-sm">per month</div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                1M Monthly Events
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                5 Projects
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                All Realtime Features
                            </div>
                        </div>

                        <button
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                            onClick={() => handleClick('PRO')}
                        >
                            Upgrade to Pro
                        </button>
                    </div>

                    {/* ENTERPRISE Plan */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 relative">
                        <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-white mb-2">ENTERPRISE</h4>
                            <div className="text-3xl font-bold text-white mb-1">$1000</div>
                            <div className="text-gray-400 text-sm">per month</div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                Unlimited Events
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                Unlimited Projects
                            </div>
                            <div className="flex items-center text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                All Realtime Features
                            </div>
                        </div>

                        <button
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                            onClick={() => handleClick('ENTERPRISE')}
                        >
                            Upgrade to Enterprise
                        </button>
                    </div>
                </div>
            </div>

            {modalOpen && clientSecret && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-scale-in">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Complete Your Payment</h2>

                        <Elements options={{ clientSecret }} stripe={stripePromise}>
                            <CheckoutForm
                                onSuccess={() => {
                                    setModalOpen(false);
                                    setPaymentConfirmed(true);
                                }}
                                clientSecret={clientSecret}
                                onCancel={() => setModalOpen(false)}
                            />
                        </Elements>
                    </div>
                </div>
            )}

        </div>
    );
}