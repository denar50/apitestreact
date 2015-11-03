var React = require('react');
var Utils = require('../utils/Utils');

var PageControl = React.createClass({
  /**
  * Event handler for when the user requests a new page.
  * It calculates (if needed) the requested page and passes it to the hanlder defined in the props.
  *
  * @param {string} page the requested page
  */
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

  /**
  * Given the current page this will render the pagination links and will try to put the current page in the middle of them. The props.offset
  * is optional and it represents the amount of links that will be displaed on each side of the current page. E.g: If the offset is 3, props.page is 5 and props.pages is 10 then
  * it will output the following links: < 2 3 4 5 6 7 8 >. Notice the arrows, they will only be displayed when there are pages beyond the limits.
  */
  render: function()
  {
    var links = [];
    if(this.props.page && this.props.pages)
    {
      var currentPage = this.props.page;
      var right = currentPage;
      var left = currentPage;
      var rightLimit = this.props.pages;
      var leftLimit = 1;
      var offset = this.props.offset || 4;
      var numberOfLinksToShow = offset * 2;
      var pages = [];
      pages.push(currentPage);
      while((left >= leftLimit || right <= rightLimit) && numberOfLinksToShow > 0)
      {
        if(--left >= leftLimit)
        {
          pages.unshift(left);
          numberOfLinksToShow--;
        }
        if(++right <= rightLimit)
        {
          pages.push(right);
          numberOfLinksToShow--;
        }
      }
      var links = pages.map(function(currentPage){
        return <a href="#" className={'page-link ' + (currentPage === this.props.page ? 'selected' : '')} onClick={this.onPageChange.bind(this, currentPage)} key={currentPage}>{currentPage}</a>
      }.bind(this));
      if(this.props.page - offset > 1)
      {
        links.unshift(<a href="#" className='page-link' onClick={this.onPageChange.bind(this, "<")} key="<">&lt;</a>);
      }
      if(this.props.page + offset < this.props.pages)
      {
        links.push(<a className='page-link' onClick={this.onPageChange.bind(this, ">")} href="#" key=">">&gt;</a>);
      }
    }
    return <div className="paginator">{links}</div>
  }
});

module.exports = PageControl;
