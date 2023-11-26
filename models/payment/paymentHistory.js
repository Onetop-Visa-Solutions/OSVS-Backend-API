const mongoose = require('mongoose');
const PaymentOrder = require('./paymentOrder');

const paymentHistorySchema = new mongoose.Schema({
  user_id: {
    type: String, //TODO to be changed once user service is done
    trim: true,
    required: true,
  },
  payment_order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PaymentOrder.name,
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE'],
    default: 'SUCCESS'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PaymentHistory = mongoose.model('PaymentHistory', paymentHistorySchema);
module.exports = PaymentHistory;
