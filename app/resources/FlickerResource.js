var $ = require('jquery');

var FlickerResource = function(){};

FlickerResource.prototype.FAIL_MSG = 'There has been an error while retrieving the pictures from Flickr';

/**
* Number of pictures per page retrieved from Flickr
*/
FlickerResource.prototype.picturesPerPage = 50;

/**
* Aborts the current request to prevent the success method from executing twice
*/
FlickerResource.prototype.abortCurrentRequest = function()
{
  if(this.xhr && this.xhr.abort)
  {
    this.xhr.abort();
  }
}

/**
* This method sends a GET request to Flickr's API. This request can be customized with the received params
* 
* @param {object} params contain the "tags" array and the "page" number. Both parameters are optional. The tag by default is "iceland"
*/
FlickerResource.prototype.fetchAll = function(params)
{
  this.abortCurrentRequest();
  var tags = params && params.tags;
  var page = params && params.page;
  var sourceUrl = 'https://api.flickr.com/services/rest/?api_key=37233d8652ecbbf97dab0ac1fc7754e3&extras=+url_m,path_alias&format=json' + '&per_page=' + this.picturesPerPage;
  var defer = $.Deferred();
  var tagsString = '';
  var method = 'flickr.photos.search';

  if(tags && tags.length > 0)
  {
    tagsString = tags.join(',');
  }

  sourceUrl += '&tags=' + (tagsString || 'iceland') + '&method=' + method;
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
        defer.resolve(data.photos);
      },
      fail: function(add)
      {
        defer.reject(this.FAIL_MSG);
      }
  });
  return defer.promise();
};

module.exports = new FlickerResource(); //Singleton
