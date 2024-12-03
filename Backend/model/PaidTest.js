const mongoose = require('mongoose');

const paidTestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  paymentDate: { type: Date, default: Date.now }
});

const PaidTest = mongoose.model('PaidTest', paidTestSchema);

module.exports = PaidTest;
