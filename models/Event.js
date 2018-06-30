const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  host: String,
  description: String,
  address: String,
  start_time: String,
  end_time: String,
  date: String,
  cost: String,
  latitude: String,
  longitude: String,
  image: String
});

mongoose.model('events', eventSchema);
