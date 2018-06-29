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
        User.findOne({ profileID: req.body.user.user.profileID })
            .then((existingUser) => {
                let has = false;
                for (var i = 0; i < existingUser.favorites.length; i++) {
                    if (existingUser.favorites[i].name === req.body.item.name) {
                        has = true;
                    } 
                }
                if (!has) {
                    existingUser.favorites.push(req.body.item);
                    existingUser.save();
                    }       
            });
    });
};
