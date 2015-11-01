var Reflux = require('reflux');
var RefreshAction = require('./RefreshAction');

var PageChangeAction = Reflux.createActions([
  'changePage'
]);

module.exports = PageChangeAction;