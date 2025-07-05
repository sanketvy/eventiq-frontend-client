import {
    Elements,
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import {useState} from "react";
import axios from "axios";
import {IdentityService} from "../utils/RestPaths.js";
import {getToken} from "../KeycloakService.js";

export default function CheckoutForm({onSuccess, onCancel, clientSecret}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: "if_required",
        });

        setLoading(false);

        if (error) {
            axios.post(IdentityService.paymentStatus, {
                clientSecret: clientSecret,
                status: "FAILED"
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(res => {
                onSuccess();
            })
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            axios.post(IdentityService.paymentStatus, {
                clientSecret: clientSecret,
                status: "SUCCESS"
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(res => {
                onSuccess();

            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                <PaymentElement/>
            </div>

            <div className="flex justify-between items-center gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`px-8 py-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        !stripe || loading
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        'Pay'
                    )}
                </button>
            </div>
        </form>
    );
}