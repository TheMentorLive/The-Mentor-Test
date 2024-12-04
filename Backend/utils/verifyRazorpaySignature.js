const crypto = require('crypto');

// Function to verify Razorpay payment signature
const verifyRazorpaySignature = (paymentId, orderId, razorpaySignature, razorpaySecret) => {
  // Create the string to hash: 'order_id|payment_id'
  const generatedSignature = crypto
    .createHmac('sha256', razorpaySecret) // Use your Razorpay secret key
    .update(orderId + "|" + paymentId)
    .digest('hex');

  // Compare the generated signature with the received signature
  return generatedSignature === razorpaySignature;
};

// Export the function for use in other files
module.exports = { verifyRazorpaySignature };
