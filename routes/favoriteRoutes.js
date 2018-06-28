const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/favorites', 
    (req, res) => {
        User.findOne({ profileID: req.user.profileID }, (err, result) => {
            res.send(result);
        });
    });

    app.get('/favorites2', 
    (req, res) => {
        console.log(req.data);
        const query = { profileID: req.user.profileID };
        User.findOneAndUpdate(query, { $push: { favorites: req.data } });
    });
};
