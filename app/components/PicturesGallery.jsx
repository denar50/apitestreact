var React = require('react');
var PicturesStore = require('../stores/PicturesStore');
var Reflux = require('reflux');
var PageControl = require('./PageControl.jsx');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');

var PicturesGallery = React.createClass({
  
  onPageChange: function(page)
  {
    debugger;
    CathegoryChangeAction.changePage(page);
  },
  render: function()
  {
    debugger;
    var pictureElements = [];
    var pictures = this.props.pictures;
    if(pictures)
    {
      for(var i = 0; i < pictures.length; i++)
      {
        pictureElements.push(<div className="image-result" key={i}><img src={pictures[i].url_m}/></div>);
      }
    }
    var page = this.props.page;
    var pages = this.props.pages;
    return <div>
      <div>
        <PageControl onPageChange={this.onPageChange} page={page} pages={pages}/>
      </div>
      <div>
        {pictureElements}
      </div>
    </div>;
  }

});

module.exports = PicturesGallery;
