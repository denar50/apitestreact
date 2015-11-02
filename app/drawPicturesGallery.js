var d3 = require('d3');
function drawPicturesGallery(pictures)
{
  var picturesContainer = d3.select('#pictures-container');
  picturesContainer.selectAll('.image-result').remove();
  pictures = pictures.filter(function(picture){
    return picture.url_m;
  });

  picturesContainer.selectAll('.image-result')
  .data(pictures)
  .enter()
  .append('div')
  .classed('image-result', true)
  .append('img')
  .attr('src', function(d){
    return d.url_m;
  })
  .classed('hidden', true).
  on('load', function() {
      d3.select(this).classed('hidden', false);
      appendEvents(this);
  });


  function appendEvents(image)
  {
    image = d3.select(image);
    image.on('click', function(){//Click for mobile
      d3.select(this).classed("hovered", true);
    })
    image.on('mouseover', function(){
      d3.select(this).classed("hovered", true);
    })
    .on('mouseleave', function(){
      console.log("Mouse leave!");
      d3.select(this).classed("hovered", false);
    });
  }

}

module.exports = drawPicturesGallery;
