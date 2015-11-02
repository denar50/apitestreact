var React = require('react');
var PicturesGallery = require('./PicturesGallery.jsx');
var PictureRefreshControl = require('./PictureRefreshControl.jsx');
var RefreshAction = require('../actions/RefreshAction');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');

var PicturesMainContainer = React.createClass({
  mixins: [Reflux.connect(PicturesStore, 'picturesStore')],
  
  toggleCathegory: function(cathegory)
  {
    CathegoryChangeAction.toggleCathegory(cathegory);
  },
  render: function(){
    var page = this.state.picturesStore && this.state.picturesStore.page;
    var pages = this.state.picturesStore && this.state.picturesStore.pages;
    var pictures = this.state.picturesStore && this.state.picturesStore.pictures;
    var cathegories = this.state.picturesStore && this.state.picturesStore.cathegories || {};
    return <div>
        <PictureRefreshControl cathegories={cathegories} onToggleCathegory={this.toggleCathegory}/>
        <PicturesGallery page={page} pages={pages} pictures ={pictures} />
      </div>
  }
});

module.exports = PicturesMainContainer;
