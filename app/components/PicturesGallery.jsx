var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');
var PageControl = require('./PageControl.jsx');

var PicturesGallery = React.createClass({
  mixins: [Reflux.connect(PicturesStore, 'picturesStore')],
  onPageChange: function(page)
  {
    
  },
  render: function()
  {
    var pictures = [];
    var picturesStore = this.state.picturesStore;
    var sourcePictures = picturesStore && picturesStore.pictures;
    if(sourcePictures)
    {
      for(var i = 0; i < sourcePictures.length; i++)
      {
        pictures.push(<div className="image-result" key={i}><img src={sourcePictures[i].url_m}/></div>);
      }
    }
    var page = picturesStore && picturesStore.page;
    var pages = picturesStore && picturesStore.pages;
    return <div>
      <div>
        <PageControl page={page} pages={pages}/>
      </div>
      <div>
        {pictures}
      </div>
    </div>;
  }

});

module.exports = PicturesGallery;
