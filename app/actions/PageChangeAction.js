var Reflux = require('reflux');
var RefreshAction = require('./RefreshAction');

var CathegoryChangeAction = Reflux.createActions([
  'changePage'
]);

module.exports = CathegoryChangeAction;