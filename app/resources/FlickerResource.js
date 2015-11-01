var $ = require('jquery');

var FlickerResource = function(){};
FlickerResource.prototype.FAIL_MSG = 'There has been an error';

FlickerResource.prototype.fetchAll = function(tags)
{
  var sourceUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
  var defer = $.Deferred();
  var tagsString = '';
  if(tags && tags.length > 0)
  {
    tagsString += '&tags=' + tags.join(',');
  }
  debugger;
  $.ajax({
      method: 'get',
      url: sourceUrl + tagsString,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrFeed',
      cache: false,
      context: this,
      success: function(data){
        debugger;
        defer.resolve(data.items);
      },
      fail: function(add)
      {
        debugger;
        defer.reject(this.FAIL_MSG);
      }
  });
  return defer.promise();
};

module.exports = new FlickerResource();
