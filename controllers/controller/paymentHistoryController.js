const APIFeatures = require('../../utils/apiFeatures');
const paymentHistoryModel = require('../../models/payment/paymentHistory');
const PaymentOrder = require('../../models/payment/paymentOrder');

exports.getAllPaymentHistory = async (req, res) => {
  try {
    const _payments = await paymentHistoryModel.aggregate([
      {
        $lookup: {
          from: 'paymentorders',
          localField: 'payment_order_id',
          foreignField: '_id',
          as: 'paymentOrders',
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: _payments.length,
      lastRequested: req.requestTime,
      data: {
        paymentHistory: _payments,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const _payment = await paymentHistoryModel.aggregate([
      {
        $match: {
          _id: req.params.id,
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        _payment,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.createPaymentHistory = async (req, res) => {
  try {
    const { payment_order_id } = req.body;
    let _paymentOrder = await PaymentOrder.findById(payment_order_id);
    if (_paymentOrder) {
      const newPayment = await paymentHistoryModel.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'payment history created successful',
        data: {
          payment: newPayment,
        },
      });
    } else {
      res.status(200).json({
        status: 'failure',
        message: 'Payment Order not found!',
      });
    }
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updatePaymentHistory = async (req, res) => {
  try {
    const _payment = await paymentHistoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    await _payment.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        _payment,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deletePaymentHistory = async (req, res) => {
  try {
    await paymentHistoryModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
