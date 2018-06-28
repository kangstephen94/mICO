const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/favorites', 
    (req, res) => {
        User.findOne({ profileID: req.user.profileID }, (err, result) => {
            res.send(result);
        });
    });

    app.post('/favorites/add', 
    (req, res) => {
        console.log(req.body);
        User.findOneAndUpdate({ profileID: req.user.profileID }, { $push: { favorites: req.body } });
    });
};
