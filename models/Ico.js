const mongoose = require('mongoose');
const { Schema } = mongoose;

const icoSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  url: String,
  tagline: String,
  intro: String,
  about: String,
  logo: String,
  country: String,
  milestones: Array,
  links: {
    type: Map,
    of: String
  },
  finance: {
    type: Map,
    of: String
  },
  dates: {
    type: Map,
    of: String
  },
  team: Array,
  ratings: Array,
  categories: Array,
  exchanges: Array,
  kyc: {
    type: Map
  }
});

module.exports = mongoose.model('ico', icoSchema);

