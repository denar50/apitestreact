var express = require('express');

(function(){

  var app = express();

  var self = this;


  self.initialize = function()
  {
    self.setRoutes();
    self.configurePublicFolders();
    self.runServer();
  };

  self.configurePublicFolders = function()
  {
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use('/assets', express.static(__dirname + '/assets'));
    app.use('/build.js', express.static(__dirname + '/build.js'));
    app.use('/build.min.js', express.static(__dirname + '/build.min.js'));
  };

  self.setRoutes = function()
  {
    app.get('/', function (req, res){
      res.sendFile(__dirname + '/index.html');
    });
  };

  self.runServer = function()
  {
    var server = app.listen(3000, function () {
      var port = server.address().port;
      console.log('App running on http://localhost:' + port)
    });
  };

  self.initialize();
})();
