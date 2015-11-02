var d3 = require('d3');
var Utils = require('../utils/Utils');

var drawPicturesGallery = (function(){
  function drawPicturesGallery(pictures, containerSelector)
  {
    var picturesContainer = d3.select(containerSelector);
    picturesContainer.selectAll('.image-result').remove();
    pictures = pictures.filter(function(picture){
      return picture.url_m;
    });

    var imageResultEnter = picturesContainer.selectAll('.image-result').data(pictures).enter();
    //For each piece of data create a div of class image-result
    var imageResultDiv = imageResultEnter.append('div').classed('image-result', true);
    var imageResultWrapper = imageResultDiv.append('div').classed('wrapper', true);
    //Creates the image
    imageResultWrapper.append('a')
    .attr('target', '_blank')
    .attr('href', function(data){
      return 'https://www.flickr.com/photos/' + data.owner + '/' + data.id;
    })
    .append('img')
    .attr('src', function(data){
      return data.url_m;
    })
    .classed('hidden', true);

    imageResultWrapper.append('div').classed('picture-details', true);


    picturesContainer.selectAll('.image-result .wrapper').each(function(){
      var wrapper = this;
      d3.select(wrapper).select('img').on('load', function() {
          d3.select(this).classed('hidden', false);
          appendEvents(wrapper);
      });
    });

    picturesContainer.selectAll('.image-result .picture-details').each(function(data){
      if(data.title.trim() !== '')
      {
        d3.select(this).append('p').text(function(data){
          return Utils.truncateText(data.title, 67);
        });
      }
    });



    function appendEvents(element)
    {
      element = d3.select(element);
      element.on('click', function(){//Click for mobile
        d3.select(this).classed("hovered", true);
      })
      element.on('mouseover', function(){
        d3.select(this).classed("hovered", true);
        picturesContainer.classed('hovering', true);
      })
      .on('mouseleave', function(){
        d3.select(this).classed("hovered", false);
        picturesContainer.classed('hovering', false);
      });
    }

    return function(){
      //TODO: This function will be in charge of removing all DOM listeners
    };

  }
  
  return drawPicturesGallery;
})();

module.exports = drawPicturesGallery;
