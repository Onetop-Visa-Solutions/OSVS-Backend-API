const Country = require('./../models/countryModel');
const APIFeatures = require('./../utils/apiFeatures');
//Route handlers | Users

exports.getAllCountries = async (req, res) => {
  try {
    //EXECUTING QUERY FOR UTILITY FEATURES
    const features = new APIFeatures(Country.find(), req.query)
      .filter()
      .sort()
      .fieldLimit()
      .pagination();
    const countries = await features.query;

    res.status(200).json({
      status: 'success',
      results: countries.length,
      lastRequested: req.requestTime,
      data: {
        countries: countries,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        country,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.createCountry = async (req, res) => {
  try {
    const newCountry = await Country.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'success on creating a country',
      data: {
        country: newCountry,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    await country.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        country,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null }); // Status 204 is a no content response
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};

exports.getCountryStats = async (req, res) => {
  try {
    const stats = await Country.aggregate([
      {
        $group: {
          _id: '$difficulty',
          numberOfCountries: { $sum: 1 },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'failure', message: err.message });
  }
};
