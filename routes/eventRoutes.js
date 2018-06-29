const mongoose = require('mongoose');
const Event = mongoose.model('events');

module.exports = (app) => {
  app.get('/events',
    (req, res) => {
      Event.find({}, (err, events) => {
        let eventMap = {};

        events.forEach( (event) => {
          eventMap[events._id] = event;
        });

        res.send(eventMap);
      });
    }
  );
};
