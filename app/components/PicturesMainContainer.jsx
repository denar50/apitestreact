var React = require('react');
var PictureViewer = require('./PictureViewer.jsx');
var PicturesGallery = require('./PicturesGallery.jsx');
var PictureRefreshControl = require('./PictureRefreshControl.jsx');

var PicturesMainContainer = React.createClass({
  render: function(){
    return <div>
        <PictureViewer />
        <PictureRefreshControl />
        <PicturesGallery />
      </div>
  }
});

module.exports = PicturesMainContainer; 