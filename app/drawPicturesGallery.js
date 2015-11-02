var d3 = require('d3');
function drawPicturesGallery(pictures)
{
  var picturesContainer = d3.select('#pictures-container');
  picturesContainer.selectAll('img').remove();
  pictures = pictures.filter(function(picture){
    return picture.url_m;
  });

  picturesContainer.selectAll('img').data(pictures).enter().append('img').attr('src', function(d){
    return d.url_m;
  }).classed('hidden', true).on('load', function() {
      d3.select(this).classed('hidden', false);
  });

}

module.exports = drawPicturesGallery;
