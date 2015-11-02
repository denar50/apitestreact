var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');
var PageControl = require('./PageControl.jsx');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PageChangeAction = require('../actions/PageChangeAction');
var Constants = require('../utils/Constants');
var drawPicturesGallery = require('../d3/drawPicturesGallery');

var PicturesGallery = React.createClass({
  imagesIds: '',
  onPageChange: function(page)
  {
    PageChangeAction.changePage(page);
  },
  shouldComponentUpdate: function(nextProps)
  {
    var newImagesIds = '';
    var shouldUpdate = true;
    if(nextProps.pictures)
    {
      nextProps.pictures.forEach(function(element){
        newImagesIds += element.id;
      });

      if(this.imagesIds !== newImagesIds)
      {
        this.imagesIds = newImagesIds;
      }
      else
      {
          shouldUpdate = false;
      }
    }
    else
    {
      shouldUpdate = false;
    }

    return shouldUpdate;
  },
  componentDidUpdate: function()
  {
    if(this.props.pictures)
    {
        drawPicturesGallery(this.props.pictures);
    }
  },
  render: function()
  {
    var page = this.props.page;
    var pages = this.props.pages;
    return <div>
      <div>
        <PageControl onPageChange={this.onPageChange} page={page} pages={pages}/>
      </div>
      <div id="pictures-container" className="pictures-container">
        //Here D3 will draw the gallery items
      </div>
    </div>;
  }

});

module.exports = PicturesGallery;
