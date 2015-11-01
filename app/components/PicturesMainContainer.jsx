var React = require('react');
var PictureViewer = require('./PictureViewer.jsx');
var PicturesGallery = require('./PicturesGallery.jsx');
var PictureRefreshControl = require('./PictureRefreshControl.jsx');
var RefreshAction = require('../actions/RefreshAction');

var PicturesMainContainer = React.createClass({
  getInitialState: function()
  {
    return {
      cathegories: {
        cats: false,
        dogs: false,
        sports: false
      }
    };
  },
  refreshPictures: function()
  {
    var cathegories = this.state.cathegories;
    var tags = [];
    for(var cathegory in cathegories)
    {
      if(cathegories.hasOwnProperty(cathegory))
      {
        if(cathegories[cathegory] === true)
        {
          tags.push(cathegory);
        }
      }
    }    
    RefreshAction.refreshPictures(tags);
  },
  toggleCathegory: function(cathegory)
  {
    var cathegories = this.state.cathegories;
    cathegories[cathegory] = !cathegories[cathegory];
    this.setState({cathegories: cathegories});
  },
  render: function(){
    return <div>
        <PictureViewer />
        <PictureRefreshControl cathegories={this.state.cathegories} onToggleCathegory={this.toggleCathegory} onRefresh={this.refreshPictures}/>
        <PicturesGallery />
      </div>
  }
});

module.exports = PicturesMainContainer; 