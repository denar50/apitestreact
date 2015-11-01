var React = require('react');
var PictureViewer = require('./PictureViewer.jsx');
var PicturesGallery = require('./PicturesGallery.jsx');
var PictureRefreshControl = require('./PictureRefreshControl.jsx');
var RefreshAction = require('../actions/RefreshAction');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');

var PicturesMainContainer = React.createClass({
  mixins: [Reflux.connect(PicturesStore, 'picturesStore')],
  
  refreshPictures: function()
  {
    RefreshAction.triggerRefresh();
  },
  toggleCathegory: function(cathegory)
  {
    CathegoryChangeAction.toggleCathegory(cathegory);
  },
  render: function(){
    debugger;
    var page = this.state.picturesStore && this.state.picturesStore.page;
    var pages = this.state.picturesStore && this.state.picturesStore.pages;
    var pictures = this.state.picturesStore && this.state.picturesStore.pictures;
    var cathegories = this.state.picturesStore && this.state.picturesStore.cathegories || {};
    return <div>
        <PictureViewer />
        <PictureRefreshControl cathegories={cathegories} onToggleCathegory={this.toggleCathegory} onRefresh={this.refreshPictures}/>
        <PicturesGallery page={page} pages={pages} pictures ={pictures} />
      </div>
  }
});

module.exports = PicturesMainContainer; 