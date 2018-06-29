const ICOBench = require('node-icobench');
const keys = require('../config/dev');
const Ico = require('../models/Ico');

const pubKey = keys.icoBenchPublic;
const priKey = keys.icoBenchPrivate;

const icobench = new ICOBench(pubKey, priKey);

module.exports = app => {
  app.get('/active_icos/:pageId', (req, res) => {
    const {pageId} = req.params;
    icobench.icos.all({orderAsc: 'end', page: pageId, status: 'active'}).then( response => res.send(response));
  }, (err, response) =>  console.log(err) ),

  app.get('/trending_icos', (req, res) => {
    icobench.icos.trending().then( response => res.send(response));
  }, (err, response) =>  console.log(err) ),

  app.get('/ico/:icoId', (req, res) => {
    const {icoId} = req.params;
    icobench.ico.profile({ico: icoId}).then( response => {
      const ico = new Ico(response);
      ico.save( err => console.log(err) );
      res.send(ico);
    })}, (err, response) =>  console.log(err) )
  ,

  app.get('/upcoming_icos/:pageId', (req, res) => {
    const {pageId} = req.params;
    icobench.icos.all({orderAsc: 'start', page: pageId, status: 'upcoming'}).then( response => res.send(response));
  }, (err, response) =>  console.log(err) ),

  app.get('/icofilter', (req, res) => {
    const {pageId} = req.params;
    icobench.icos.filters().then( response => console.log(response));
  }, (err, response) =>  console.log(err) )
};