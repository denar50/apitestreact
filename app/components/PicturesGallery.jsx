var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');
var PageControl = require('./PageControl.jsx');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PageChangeAction = require('../actions/PageChangeAction');
var drawPicturesGallery = require('../d3/drawPicturesGallery');

/**
* Uses D3 to create the gallery based on the pictures received in props.pictures.
* It contains a PageControl component to handle the pagination
*/
var PicturesGallery = React.createClass({
  picturesContainerId: 'pictures-container',
  //Ids of the current displayed pictures
  imagesIds: '',

  /**
  * Event handler for when a page is requested. Triggers the event changePage defined in the PageChangeAction
  *
  * @param {number} page the page to display
  */
  onPageChange: function(page)
  {
    PageChangeAction.changePage(page);
  },

  /**
  * Renders the galleries using D3 by passing in the parameters props.pictures and the selector of the pictures container.
  */
  renderPicturesGallery: function()
  {
    if(this.props.pictures)
    {
        this.d3Clean = drawPicturesGallery(this.props.pictures, '#'+this.picturesContainerId);
    }
  },

  /**
  * Checks whether new pictures are contained in the "pictures" array contained in "nextProps".
  * This is done by comparing the imageIds variable to the concatenated ids of the "pictures" array.
  * The component will update only when there are new pictures.
  *
  * @param {object} nextProps react sends this new props object that will be stored in "props" when the component renders
  */
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

  /**
  *
  */
  componentDidUpdate: function()
  {
    this.renderPicturesGallery();
  },

  /**
  * Renders the galleries using D3 by passing in the parameters props.pictures and the selector of the pictures container.
  */
  componentDidMount: function()
  {
    this.renderPicturesGallery();
  },

  /**
  * Asks D3 to remove all the DOM elements created by it and also its listeners to prevent memory leaks.
  */
  componentWillUnmount: function()
  {
    Utils.isFunction(this.d3Clean) && this.d3Clean();
  },


  render: function()
  {
    var page = this.props.page;
    var pages = this.props.pages;
    return <div>
      <div>
        <PageControl onPageChange={this.onPageChange} page={page} pages={pages}/>
      </div>
      <div id={this.picturesContainerId} className="pictures-container">
        //Here D3 will draw the gallery items
      </div>
    </div>;
  }

});

module.exports = PicturesGallery;
