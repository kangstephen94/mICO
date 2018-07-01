const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
    app.post('/api/favorites/add', 
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
                console.log(existingUser);
                res.send(existingUser);
            });
    });

    app.put('api/favorites/remove',
        (req, res) => {
            User.findOne({ profileID: req.body.user.user.profileID })
                .then((existingUser) => {
                    const newFavorites = existingUser.favorites.filter(ico => {
                        return ico.name !== req.body.item.name;
                    });
                    existingUser.favorites = newFavorites;
                    existingUser.save();
                    res.send(existingUser);
                });
        });
};
