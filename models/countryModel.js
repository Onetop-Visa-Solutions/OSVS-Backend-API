const mongoose = require('mongoose');

//Common Schemas
const educationalRequirementSchema = new mongoose.Schema({
  title: string,
  type: Object,
  name: String,
  requirementsList: [
    {
      title: String,
      detail: [{ name: String, content: String }],
      icon: String,
    },
  ], //With a sense that a requirement could have more than one detail, such as English proficiency requirements could have many sub-requirement
  Description: String,
});

const informationSchema = new mongoose.Schema({
  description: String,
  startDate: Date,
  endDate: Date,
  year: Number,
  availability: Boolean,
  level: String,
  applicationExpiryDate: Date,
  maxApplicantsNumber: Number,
  currentApplicantsNumber: Number,
  duration: {
    type: Object,
    label: String,
    length: Number,
  },
});

//Visit Packages
const visitPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  information: {
    type: informationSchema,
  },
  duration: {
    type: String,
    label: String,
    length: String,
  },
  applicants: [String],
});

//Educational Packages
const availableIntakeSchema = new mongoose.Schema({
  intakeSeasons: { type: [String] },
  intakeYear: Number,
});

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: String,
  specialRequirement: {
    type: Object,
    name: String,
    description: String,
  },
  availability: Boolean,
  availableIntakes: { type: [availableIntakeSchema] },
});

const educationCostSchema = new mongoose.Schema({
  description: String,
  minimumTuitionCost: Number,
  MaximumTuitionCost: Number,
  averageLivingCost: Number,
  costLabel: String,
  scholarships: [
    {
      type: Object,
      name: String,
      minimumAmount: Number,
      maximumAmount: Number,
    },
  ],
});

const educationalPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  information: { type: [informationSchema] }, //Skip this part
  institutions: [{ name: String, icon: String }],
  institutionsDescription: String,
  programs: {
    //Skip this part
    type: [programSchema],
  },
  requirements: [educationalRequirementSchema],
  scholarshipAndFunding: {
    type: educationCostSchema,
  },
  applicants: [String], // Skip this part
});

//Consultation Packages
const consultationPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  services: [{ type: Object, name: String, description: String }],
  priceStartingFrom: Number,
});

//MAIN SCHEMA ---- MODEL
//Country Schema
const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A country must have a name'],
    unique: true,
    trim: true,
  },
  alias: { type: String },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  flagImage: {
    type: String,
    required: [true, 'A country must have a flag image'],
  },
  description: {
    type: String,
    required: [true, 'A country must have a description'],
    trim: true,
  },
  descriptionImages: {
    type: [String],
  },
  createdAt: { type: Date, default: Date.now() },
  visitPackages: {
    type: [visitPackageSchema],
  },
  educationalPackage: {
    type: educationalPackageSchema,
  },
  consultationPackages: {
    type: [consultationPackageSchema],
  },
  aboutCountry: {
    type: Object,
    currency: String,
    currencySymbol: String,
    advantages: [
      {
        name: String,
        image: String,
        description: String,
      },
    ],
  },
  testimonialVideo: {
    type: String,
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
