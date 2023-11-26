const Service = require('./../models/serviceModel');

exports.getServices = async (req, res) => {
  try {
    const _services = await Service.find();

    res.status(200).json({
      status: 'success',
      results: _services.length,
      lastRequested: req.requestTime,
      data: {
        services: _services,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const _service = await Service.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        _service,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Service created successfully',
      data: {
        service: newService,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const _service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    await _service.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        _service,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null }); // Status 204 is a no content response
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
