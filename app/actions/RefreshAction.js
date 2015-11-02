var Reflux = require('reflux');
var FlickerResource = require('../resources/FlickerResource');

var RefreshAction = Reflux.createActions([
  //Creates: refreshPictures, refreshPicturesCompleted and refreshPicturesFailed 
  {'refreshPictures' : {asyncResult: true}},
  'triggerRefresh'
]);

/**
* Listen to the refreshPictures event and refresh the pictures asynchronously. Trigger events accordingly in case the refresh succeeds or fails.
*
* @param {object} params an object that can contain a "tags" array and a "page" to load pictures from the resource
*/
RefreshAction.refreshPictures.listen(function(params){  
  var promise = FlickerResource.fetchAll(params);
  promise.then(this.completed);
  promise.fail(this.failed);
});

module.exports = RefreshAction;