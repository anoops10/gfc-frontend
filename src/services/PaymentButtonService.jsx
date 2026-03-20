import axios from "axios";

export const processPayment = async (price) => {
  return new Promise(async (resolve, reject) => {
    // 1. Check if Razorpay SDK is loaded
    if (!window.Razorpay) {
      reject(new Error("Razorpay SDK failed to load. Are you online?"));
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

      // 2. Create Order on your backend
      const { data: order } = await axios.post(`${API_BASE_URL}/createorder`, {
        amount: price,
        // Optional: Send userId or membershipId to link the order in your DB
        // userId: user?.id 
      });

      // 3. Configure Razorpay Options
      const options = {
        key: "rzp_test_SMuM7WWUskn0rC",
        amount: order.amount,
        currency: "INR",
        name: "My App",
        description: "Test Transaction",
        order_id: order.id,

        // 4. Handle Successful Payment & Verification
        handler: async function (response) {
          try {
            // Verify the signature on the backend
            const verificationResponse = await axios.post(`${API_BASE_URL}/payment/verify`, response);
            
            // Resolve the promise, allowing handleSubmit to continue
            resolve(verificationResponse.data); 
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            reject(new Error("Payment succeeded, but verification failed."));
          }
        },

        // 5. Prefill user data
        // prefill: {
        //   name: user?.name || "",
        //   email: user?.email || "",
        //   contact: user?.phone || ""
        // },

        theme: {
          color: "#3399cc"
        },

        // 6. Handle user closing the modal without paying
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled by user."));
          }
        }
      };

      const rzp = new window.Razorpay(options);

      // 7. Handle Payment Failure (e.g., declined card)
      rzp.on('payment.failed', function (response) {
        console.error("Payment Failed", response.error);
        reject(new Error(response.error.description));
      });

      // Open the modal
      rzp.open();

    } catch (error) {
      console.error("Error initiating payment:", error);
      reject(new Error("Could not initiate payment. Please try again later."));
    }
  });
};