/*var Reflux = require('reflux');
var RefreshAction = require('./RefreshAction');

var PageChangeAction = Reflux.createActions([
  'pageChange'
]);
PageChangeAction.pageChange.listen(function(page){
  RefreshAction
});
//First the savePet event is triggered, Then save the pet asyncronosly and based on the promise
//Returned by the resource, fire savePetCompleted or savePetFailed
RefreshAction.refreshPictures.listen(function(tags){
  var promise = FlickerResource.fetchAll(tags);
  promise.then(this.completed);
  promise.fail(this.failed);
});

module.exports = PageChangeAction;*/