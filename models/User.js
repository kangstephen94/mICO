const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    profileID: String,
    favorites: Array
});

mongoose.model('users', userSchema);
