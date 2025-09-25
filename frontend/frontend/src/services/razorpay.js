// Razorpay UPI Payment Service
class RazorpayService {
  constructor() {
    this.keyId = 'rzp_test_1234567890'; // Test key
    this.keySecret = 'test_secret_key'; // Test secret
  }

  // Initialize Razorpay payment
  async initiatePayment({
    amount,
    currency = 'INR',
    description,
    patientInfo,
    doctorInfo,
  }) {
    return new Promise((resolve, reject) => {
      const options = {
        key: this.keyId,
        amount: amount * 100, // Convert to paise
        currency: currency,
        name: 'True Opinion',
        description: description,
        image: '/logo.png',
        order_id: `order_${Date.now()}`, // Mock order ID
        handler: function (response) {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: patientInfo.name,
          email: patientInfo.email,
          contact: patientInfo.phone || '9999999999',
        },
        notes: {
          doctor_id: doctorInfo.id,
          doctor_name: doctorInfo.name,
          consultation_type: 'second_opinion',
        },
        theme: {
          color: '#007BFF',
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled by user'));
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        reject(new Error(response.error.description || 'Payment failed'));
      });

      rzp.open();
    });
  }

  // Verify payment (mock implementation)
  async verifyPayment(paymentData) {
    // In real implementation, this would verify with backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          verified: true,
          status: 'success',
          ...paymentData,
        });
      }, 1000);
    });
  }

  // Create test UPI payment
  async createTestUPIPayment({ amount, upiId, description }) {
    return new Promise((resolve, reject) => {
      // Simulate UPI payment flow
      const testUPIIds = [
        'test@paytm',
        'test@googlepay',
        'test@phonepe',
        'success@razorpay',
      ];

      setTimeout(() => {
        if (testUPIIds.includes(upiId)) {
          resolve({
            success: true,
            paymentId: `pay_${Date.now()}`,
            method: 'upi',
            upiId: upiId,
            amount: amount,
            status: 'captured',
          });
        } else {
          reject(new Error('Invalid UPI ID for test mode'));
        }
      }, 2000);
    });
  }
}

export default new RazorpayService();
