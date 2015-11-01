var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var ShowItemAction = require('../actions/ShowItemAction');
/**
* This store subscribes to the PetActions and implement the actions that PetActions espeficy.
*
*/
var PicturesStore = Reflux.createStore({
  listenables: [RefreshAction, ShowItemAction],
  currentPicture: null,
  state: {
    currentPicture: null,
    fetching: false
  },
  
  refreshPictures: function()
  {
    this.state.pictures = undefined;
    this.trigger(this.state);
  },
  
  refreshPicturesCompleted: function(data)
  {
    this.state.pictures = data;
    this.trigger(this.state);
  },
  
  refreshPicturesFailed: function()
  {
    debugger;
  }

});

module.exports = PicturesStore;