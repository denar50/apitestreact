var $ = require('jquery');

var FlickerResource = function(){};
FlickerResource.prototype.FAIL_MSG = 'There has been an error';
FlickerResource.prototype.picturesPerPage = 50;
FlickerResource.prototype.abortCurrentRequest = function()
{
  if(this.xhr && this.xhr.abort)
  {
    this.xhr.abort();
  }
}
FlickerResource.prototype.fetchAll = function(params)
{
  this.abortCurrentRequest();
  var tags = params.tags;
  var page = params.page;
  var sourceUrl = 'https://api.flickr.com/services/rest/?api_key=37233d8652ecbbf97dab0ac1fc7754e3&extras=+url_m,path_alias&format=json' + '&per_page=' + this.picturesPerPage;
  var defer = $.Deferred();
  var tagsString = '';
  var method = 'flickr.photos.getRecent'; //Default method when there is not a search criteria in the URL

  if(tags && tags.length > 0)
  {
    tagsString += '&tags=' + tags.join(',');
    method = 'flickr.photos.search';
  }

  sourceUrl += tagsString + '&method=' + method;
  if(page)
  {
    sourceUrl += '&page='+page;
  }
  this.xhr = $.ajax({
      method: 'get',
      url: sourceUrl,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      cache: false,
      context: this,
      success: function(data){
        debugger;
        defer.resolve(data.photos);
      },
      fail: function(add)
      {
        defer.reject(this.FAIL_MSG);
      }
  });
  return defer.promise();
};

module.exports = new FlickerResource();
