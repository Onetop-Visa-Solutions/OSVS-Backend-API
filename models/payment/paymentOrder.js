const mongoose = require('mongoose');

const paymentOrderSchema = new mongoose.Schema({
  user_id: {
    type: String, //TODO will be replaced once user finalized
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING','COMPLETED'],
    default: 'PENDING'
  },
  description:{
    type: String,
    trim: true,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PaymentOrder = mongoose.model('PaymentOrder', paymentOrderSchema);
module.exports = PaymentOrder;
