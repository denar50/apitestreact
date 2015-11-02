var React = require('react');
var PicturesGallery = require('./PicturesGallery.jsx');
var PictureTagsFilter = require('./PictureTagsFilter.jsx');
var RefreshAction = require('../actions/RefreshAction');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');

/**
* This is the main container of the app. It has an PictureTagsFilter with checkboxes representing the tags to filter the pictures and a PicturesGallery
* where the images retrieved from the server will be displaed.
*/
var PicturesMainContainer = React.createClass({
  mixins: [Reflux.connect(PicturesStore, 'picturesStore')],
  
  /**
  * Event handler for when a cathegory is toggled. Triggers the toggleCathegory event defined in CathegoryChangeAction
  * 
  * @param {string} 
  */
  toggleCathegory: function(cathegory)
  {
    CathegoryChangeAction.toggleCathegory(cathegory);
  },
  
  
  render: function(){
    //TODO: See if there is any way of accessing the store's initial data on the first call to this render picture.
    var page = this.state.picturesStore && this.state.picturesStore.page;
    var pages = this.state.picturesStore && this.state.picturesStore.pages;
    var pictures = this.state.picturesStore && this.state.picturesStore.pictures;
    var cathegories = this.state.picturesStore && this.state.picturesStore.cathegories || {};
    return <div>
        <PictureTagsFilter cathegories={cathegories} onToggleCathegory={this.toggleCathegory}/>
        <PicturesGallery page={page} pages={pages} pictures ={pictures} />
      </div>
  }
});

module.exports = PicturesMainContainer;
