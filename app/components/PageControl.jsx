var React = require('react');
var Utils = require('../utils/Utils');

var PageControl = React.createClass({
  onPageChange: function(page)
  {
    var page = page;
    if(page === "<")
    {
      page = this.props.page - 1;
    }
    else if(page === ">")
    {
      page = this.props.page + 1;
    }
    if(Utils.isFunction(this.props.onPageChange))
    {
      this.props.onPageChange(page);
    }
  },
  render: function()
  {
    if(this.props.page && this.props.pages)
    {
      var offset = this.props.offSet || 4;
      var links = [];
      var currentPage = this.props.page;
      debugger;
      var linksCount = 0;
      while(currentPage >= 1 && linksCount <= offset)
      {
        links.unshift(<a href="#" key={currentPage} onClick={this.onPageChange.bind(this, currentPage)} className={currentPage === this.props.page ? 'selected' : ''}>{currentPage}</a>);
        currentPage--;
        linksCount++;
      }
      currentPage = this.props.page + 1;
      debugger;
      offset = offset + (offset - linksCount); //add the remaning links that were not created
      linksCount = 0;
      while(currentPage <= this.props.pages && linksCount <= offset)
      {
        links.push(<a href="#" key={currentPage}>{currentPage}</a>);
        currentPage++;
        linksCount++;
      }
      if(this.props.page - 4 > 1)
      {
        links.unshift(<a href="#" onClick={this.onPageChange.bind(this, "<")} key="<">&lt;</a>);
      }
      if(this.props.page + 4 < this.props.pages)
      {
        links.push(<a onClick={this.onPageChange.bind(this, ">")} href="#" key="<">&gt;</a>);
      }
    }
    return <div>{links}</div>
  }
});

module.exports = PageControl;