const Testimonials = require('../../models/testimonialsModel');
const fileUpload = require('../../utils/minioClient');
const minioCLient = require('../../utils/minioClient');
const short = require('short-uuid');

exports.getTestimonials = async (req, res) => {
  try {
    const _testimonials = await Testimonials.find();

    res.status(200).json({
      status: 'success',
      results: _testimonials.length,
      lastRequested: req.requestTime,
      data: {
        testimonials: _testimonials,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.createTestimonials = async (req, res) => {
  try {
    let originalname = req.file?.originalname.split(' ');
    const fileName = originalname?.join('_');

    const uuid = short.generate();
    console.log('avatar///', fileName, uuid);
    const pathD = fileUpload(uuid, file);
    if (pathD) {
      const newTestimonials = await Testimonials.create({
        ...req.body,
        avatar: pathD,
      });
      res.status(200).json({
        status: 'success',
        message: 'New testimonials added successfully',
        data: {
          testimonials: newTestimonials,
        },
      });
    }
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updateTestimonials = async (req, res) => {
  try {
    const _testimonials = await Testimonials.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    await _testimonials.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        _testimonials,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deleteTestimonials = async (req, res) => {
  try {
    await Testimonials.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
