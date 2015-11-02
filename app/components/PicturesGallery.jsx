var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');
var PageControl = require('./PageControl.jsx');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var PageChangeAction = require('../actions/PageChangeAction');
var Constants = require('../utils/Constants');
var drawPicturesGallery = require('../drawPicturesGallery');

var PicturesGallery = React.createClass({

  onPageChange: function(page)
  {
    PageChangeAction.changePage(page);
  },
  render: function()
  {
    var pictureElements = [];
    var pictures = this.props.pictures;
    if(pictures)
    {
      for(var i = 0; i < pictures.length; i++)
      {
        var pictureURL = pictures[i].url_m;
        if(!pictureURL)
        {
          continue;
        }
        pictureElements.push(<div className="image-result" key={i} style={{backgroundImage: 'url(' + pictureURL + ')'}}></div>);
      }
      debugger;
      drawPicturesGallery(pictures);
    }
    var page = this.props.page;
    var pages = this.props.pages;
    return <div>
      <div>
        <PageControl onPageChange={this.onPageChange} page={page} pages={pages}/>
      </div>
      <div id="pictures-container" className="pictures-container">

      </div>
    </div>;
  }

});

module.exports = PicturesGallery;
