var Reflux = require('reflux');
var FlickerResource = require('../resources/FlickerResource');

var RefreshAction = Reflux.createActions([
  //Creates: refreshPictures, refreshPicturesCompleted and refreshPicturesFailed 
  {'refreshPictures' : {asyncResult: true}},
  'triggerRefresh'
]);
//First the savePet event is triggered, Then save the pet asyncronosly and based on the promise
//Returned by the resource, fire savePetCompleted or savePetFailed
RefreshAction.refreshPictures.listen(function(params){  
  var promise = FlickerResource.fetchAll(params);
  promise.then(this.completed);
  promise.fail(this.failed);
});

module.exports = RefreshAction;