var d3 = require('d3');
var Utils = require('../utils/Utils');

var drawPicturesGallery = (function(){
  
  /**
  * Removes all the .image-result elements from the picturesContainer
  *
  * @param {Dom element} picturesContainer expected to be the parent of all the ".image-result" elements.
  */
  function cleanGallery(picturesContainer)
  {
    picturesContainer.selectAll('.image-result').remove();
  }
  
  /**
  * Appends the mouseover and mouseleave on the element in order to zoom it and make the other images opaque.
  * The hovering class will make all images opaque except the one that is being hovered.
  *
  * @param {Dom element} element ".image-result .wrapper" element that holds the image and its description
  * @param {Dom element} picturesContainer expected to be the parent of all the ".image-result" elements.
  */
  function appendEvents(element, picturesContainer)
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

  /**
  * Draws the gallery
  *
  * @param {array} pictures contain the data that D3 will use to draw this gallery. Every item in the data is expected to contain an image (have an "url_m" attribute defined),
  * if not it will be ignored. Other attributes used to draw the picture: "owner", "id" and "title"
  */
  function drawPicturesGallery(pictures, containerSelector)
  {
    var picturesContainer = d3.select(containerSelector);
    if(picturesContainer.empty())
    {
      throw "drawPicturesGallery: The selector \"" + containerSelector + "\" didn't match any element from the dom";
    }
    //Clean any existing element
    cleanGallery(picturesContainer);
    //Show only results that contain a medium picture (url_m)
    pictures = pictures.filter(function(picture){
      return picture.url_m;
    });

    var imageResultEnter = picturesContainer.selectAll('.image-result').data(pictures).enter();
    //For each piece of data create a div of class image-result
    var imageResultDiv = imageResultEnter.append('div').classed('image-result', true);
    var imageResultWrapper = imageResultDiv.append('div').classed('wrapper', true);
    //Wraps the image in an anchor element
    imageResultWrapper.append('a')
    //When clicked, open in a new tab
    .attr('target', '_blank')
    //Flicker URL created with the "owner" and "id" attributes of every piece of data
    .attr('href', function(data){
      return 'https://www.flickr.com/photos/' + data.owner + '/' + data.id;
    })
    //The image element
    .append('img')
    .attr('src', function(data){
      return data.url_m;
    })
    //Hidden until it loads (see below)
    .classed('hidden', true);

    //Add the onload listeners to the pictures
    picturesContainer.selectAll('.image-result .wrapper').each(function(){
      var wrapper = this;
      d3.select(wrapper).select('img').on('load', function() {
          //Display the image after it's been loaded
          d3.select(this).classed('hidden', false);
          //Append the event handlers of the wrapper for when the user mouses over and out of the wrapper
          appendEvents(wrapper, picturesContainer);
      });
    });
    
    //Create the ".picture-details" divs
    imageResultWrapper.append('div').classed('picture-details', true);
    
    //For every ".picture-details" div, create a p element to add a short description of the picture
    picturesContainer.selectAll('.image-result .picture-details').each(function(data){
      if(data.title.trim() !== '')
      {
        d3.select(this).append('p').text(function(data){
          return Utils.truncateText(data.title, 67);
        });
      }
    });

    return cleanGallery; 
  }
  
  return drawPicturesGallery;
})();

module.exports = drawPicturesGallery;
