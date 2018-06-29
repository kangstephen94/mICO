const mongoose = require('mongoose');
const Event = mongoose.model('events');

module.exports = (app) => {
  app.get('/api/events',
    (req, res) => {
      console.log('hit route');
      Event.find( (err, events) => {
        if (err) return next(err);
        res.send(events);
      });
    }
  );
};
// module.exports = (app) => {
//   app.get('/api/events',
//     (req, res) => {
//       Event.find({}, (err, events) => {
//         let eventMap = {};
//
//         events.forEach( (event) => {
//           eventMap[events._id] = event;
//         });
//         console.log(eventMap);
//         console.log(res);
//         res.send(eventMap);
//       });
//     }
//   );
// };
