var dataservice = require("dataservice")
    ,events = require('events')
    ,Api = require("mockapi");
exports.admin = function(req, res){
  res.render('admin', { title: 'Administration' });
};