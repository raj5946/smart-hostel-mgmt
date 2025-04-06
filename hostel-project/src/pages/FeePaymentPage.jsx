// src/pages/FeePayment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function FeePayment() {
  const [outstandingFees, setOutstandingFees] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      console.log("Razorpay script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script.");
      setError(
        "Failed to load payment gateway. Please refresh or try again later."
      );
    };
    document.body.appendChild(script);
  }, []);

  // Fetch outstanding fees and payment history on mount
  useEffect(() => {
    fetchOutstandingFees();
    fetchPaymentHistory();
  }, []);

  // Poll for updated fees and payment history every 60 seconds (simulating a cron job)
  useEffect(() => {
    const pollingInterval = setInterval(() => {
      console.log("Polling for updated fees and payment history...");
      fetchOutstandingFees();
      fetchPaymentHistory();
    }, 60000); // 60 seconds

    return () => clearInterval(pollingInterval);
  }, []);

  // Fetch the outstanding fees from the backend
  const fetchOutstandingFees = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/payment/outstanding",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOutstandingFees(response.data.outstandingAmount);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch outstanding fees:", err);
      setError("Could not load outstanding fees. Please try again later.");
      setIsLoading(false);
    }
  };

  // Fetch payment history from the backend
  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/payment/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPaymentHistory(response.data.payments);
    } catch (err) {
      console.error("Failed to fetch payment history:", err);
    }
  };

  // Initiate the Razorpay payment process
  const handlePayFees = async () => {
    if (!scriptLoaded) {
      alert(
        "Payment gateway not loaded yet. Please wait a moment and try again."
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setPaymentSuccess(false);

    try {
      const token = localStorage.getItem("token");

      // 1. Create an order on the server
      const createOrderResponse = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        { amount: outstandingFees },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { order_id, amount, currency } = createOrderResponse.data;

      // 2. Configure Razorpay options
      const options = {
        key: "rzp_test_cnIvQbObT8mkTh", // your test key
        order_id,
        amount,
        currency,
        name: "Smart Hostel Fees",
        description: "UPI Fee Payment",
        prefill: {
          contact: "9063294723", // Pre-filled phone number
        },
        // Try enabling default blocks to allow fallback methods
        config: {
          display: {
            blocks: {
              upi_block: {
                name: "Pay Using UPI (QR)",
                instruments: [
                  {
                    method: "upi",
                    flows: ["qr"], // Force a QR code payment flow
                  },
                ],
              },
            },
            sequence: ["block.upi_block"],
            preferences: {
              show_default_blocks: true, // Enable default payment methods as fallback
            },
          },
        },
        handler: function (response) {
          // On successful payment, verify signature
          verifyPaymentSignature(response);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // 3. Handle payment failure event
      rzp.on("payment.failed", function (response) {
        setError("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
        setIsLoading(false);
      });
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      setError("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  // Verify the payment signature on the backend
  const verifyPaymentSignature = async (paymentResult) => {
    try {
      const token = localStorage.getItem("token");

      const verifyResponse = await axios.post(
        "http://localhost:3000/api/payment/verify-signature",
        {
          razorpay_order_id: paymentResult.razorpay_order_id,
          razorpay_payment_id: paymentResult.razorpay_payment_id,
          razorpay_signature: paymentResult.razorpay_signature,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (verifyResponse.data.success) {
        setPaymentSuccess(true);
        alert("Payment successful and verified!");
        // Refresh outstanding fees and payment history
        fetchOutstandingFees();
        fetchPaymentHistory();
      } else {
        setError("Payment verification failed");
      }
    } catch (err) {
      console.error("Signature verification error:", err);
      setError("Could not verify payment. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Fee Payment (Razorpay UPI)
          </h2>
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          {paymentSuccess && (
            <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center">
              Payment was successful! Thank you.
            </div>
          )}

          {/* Due Alerts Section */}
          {outstandingFees > 0 && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6 text-center shadow-md">
              <p className="text-lg font-semibold">
                Alert: Your fee payment is due. Please pay ₹{outstandingFees}{" "}
                promptly to avoid any late fees.
              </p>
            </div>
          )}

          <div className="border border-gray-300 rounded p-4 text-center mb-6">
            <p className="text-xl font-medium">
              Outstanding Fees: ₹ {outstandingFees}
            </p>
            {outstandingFees > 0 && (
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300"
                onClick={handlePayFees}
              >
                Pay Now
              </button>
            )}
          </div>

          {paymentHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Payment History
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((pay) => (
                      <tr key={pay._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(pay.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹ {pay.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {pay.transactionId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeePayment;
