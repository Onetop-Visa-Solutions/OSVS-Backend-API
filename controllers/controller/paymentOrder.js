const APIFeatures = require('../../utils/apiFeatures');
const paymentOrderModel = require('../../models/payment/paymentOrder');

exports.getAllPaymentOrders = async (req, res) => {
  try {
    const features = new APIFeatures(paymentOrderModel.find(), req.query)
      .filter()
      .sort()
      .fieldLimit()
      .pagination();
    const _payments = await features.query;

    res.status(200).json({
      status: 'success',
      results: _payments.length,
      lastRequested: req.requestTime,
      data: {
        paymentOrders: _payments,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getPaymentOrder = async (req, res) => {
  try {
    console.log(req.params.id)
    const _payment = await paymentOrderModel.findById(req.params.id);
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

exports.createPaymentOrder = async (req, res) => {
  try {
    const newPayment = await paymentOrderModel.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'success on creating a Payment Order',
      data: {
        paymentOrder: newPayment,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updatePaymentOrder = async (req, res) => {
  try {
    const _paymentOrders = await paymentOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    await country.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        _paymentOrders,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deletePaymentOrder = async (req, res) => {
  try {
    await paymentOrderModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
