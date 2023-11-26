const APIFeatures = require('./../utils/apiFeatures');
const paymentModel = require('./../models/payment/paymentHistory');

exports.getAllPaymentHistory = async (req, res) => {
  try {
    //EXECUTING QUERY FOR UTILITY FEATURES
    const features = new APIFeatures(paymentModel.find(), req.query)
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
        paymentHistory: _payments,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const _payment = await paymentModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        payment,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.createPaymentHistory = async (req, res) => {
  try {
    const newPayment = await paymentModel.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'success on creating a country',
      data: {
        payment: newPayment,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updatePaymentHistory = async (req, res) => {
  try {
    const country = await paymentModel.findByIdAndUpdate(
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
        paymentModel,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deletePaymentHistory = async (req, res) => {
  try {
    await paymentModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
