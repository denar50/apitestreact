var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');

var PicturesGallery = React.createClass({
  mixins: [Reflux.connect(PicturesStore, 'picturesStore')],
  render: function()
  {
    debugger;
    var pictures = [];
    var sourcePictures = this.state.picturesStore && this.state.picturesStore.pictures;
    if(sourcePictures)
    {
      for(var i = 0; i < sourcePictures.length; i++)
      {
        pictures.push(<div key={i + sourcePictures[i].author_id}><img src={sourcePictures[i].media.m}/></div>);
      }
    }
    return <div>
      {pictures}
      </div>;
  }

});

module.exports = PicturesGallery;


