var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var ShowItemAction = require('../actions/ShowItemAction');
var FlickerResource = require('../resources/FlickerResource');
/**
* This store subscribes to the PetActions and implement the actions that PetActions espeficy.
*
*/
var PicturesStore = Reflux.createStore({
  listenables: [RefreshAction, ShowItemAction],
  currentPicture: null,
  state: {
    currentPicture: null,
    picturesPerPage: FlickerResource.picturesPerPage
  },
  
  refreshPictures: function()
  {
    this.trigger(this.state);
  },
  
  refreshPicturesCompleted: function(data)
  {
    this.state.pictures = data.photo;
    this.state.page = data.page;
    this.state.pages = data.pages;
    this.trigger(this.state);
  },
  
  refreshPicturesFailed: function()
  {
    debugger;
  }

});

module.exports = PicturesStore;