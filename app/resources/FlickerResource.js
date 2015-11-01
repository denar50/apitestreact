var $ = require('jquery');

var FlickerResource = function(){};
FlickerResource.prototype.FAIL_MSG = 'There has been an error';

FlickerResource.prototype.fetchAll = function(tags)
{
  var sourceUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1a28265a5757ae15855f4bb14089f5d4&extras=+url_m&page=5&format=json';
  var defer = $.Deferred();
  var tagsString = '';
  var jsonpCallback = 'jsonFlickrApi';
  if(tags && tags.length > 0)
  {
    var page = Math.floor((Math.random() * 100) + 1);
    tagsString += '&tags=' + tags.join(',');
    sourceUrl = sourceUrl + tagsString + '&page=' + page;
  }
  else
  {
    sourceUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    jsonpCallback = 'jsonFlickrFeed';
  }
  $.ajax({
      method: 'get',
      url: sourceUrl,
      dataType: 'jsonp',
      jsonpCallback: jsonpCallback,
      cache: false,
      context: this,
      success: function(data){
        debugger;
        defer.resolve(data.items);
      },
      fail: function(add)
      {
        defer.reject(this.FAIL_MSG);
      }
  });
  return defer.promise();
};

module.exports = new FlickerResource();
