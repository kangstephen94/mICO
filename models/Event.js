const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  host: String,
  description: String,
  address: String,
  start_time: String,
  end_time: String,
  date: Stri
  cost: String,
  latitude: Number,
  longitude: Number,
  image: String
});

mongoose.model('events', eventSchema);
