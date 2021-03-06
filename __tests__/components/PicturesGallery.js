var PICTURES_GALLERY_PATH = '../../app/components/PicturesGallery.jsx';
var APP_UTILS_PATH = '../../app/utils/Utils';

jest.dontMock(PICTURES_GALLERY_PATH);
jest.dontMock(APP_UTILS_PATH);

describe('PicturesGallery react component', function(){
  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');
  var PicturesGallery = require(PICTURES_GALLERY_PATH);
  var Utils = require(APP_UTILS_PATH);
  var drawPicturesGallery = require('../../app/d3/drawPicturesGallery');


  var picturesGallery;
  beforeEach(function(){
    picturesGallery = TestUtils.renderIntoDocument(<PicturesGallery page={1} pages={1} pictures={picturesMock}/>);
  });

  it('Should pass in the images to drawPicturesGallery and the id of the pictures container where the pictures are going to be drawn', function()
  {
    var firstCall = drawPicturesGallery.mock.calls[0];
    var calledWithRightParams = firstCall[0] === picturesMock && firstCall[1] === '#' + picturesGallery.picturesContainerId;
    expect(calledWithRightParams).toBe(true);
  });

  it('Should not update when the pictures array has the same pictures as the previous render', function()
  {
    picturesGallery.setState({foo: 'bar'});//First call populates the imagesIds property of the component
    spyOn(picturesGallery, 'shouldComponentUpdate').andCallThrough();
    spyOn(picturesGallery, 'render');
    picturesGallery.setState({foo: 'bar'}); //This call is the testcase
    expect(picturesGallery.render).not.toHaveBeenCalled();
  });

  it('Should update when the pictures array changes', function()
  {
    picturesGallery.setState({foo: 'bar'});//First call populates the imagesIds property of the component
    spyOn(picturesGallery, 'shouldComponentUpdate').andCallThrough();
    spyOn(picturesGallery, 'render').andCallThrough();
    picturesMock[0].id = 'newid';
    picturesGallery.setState({foo: 'bar'}); //This call is the testcase
    expect(picturesGallery.render).toHaveBeenCalled();
  });

  afterEach(function(){
    drawPicturesGallery.mockClear();
  });
  var picturesMock = [];
  picturesMock.push({
    id: 'aaaaa',
    owner: 'john doe',
    title: 'a title 1',
    url_m: 'http://lorempixel.com/400/200/sports/1/ '
  });
  picturesMock.push({
    id: 'bbbbbb',
    owner: 'marie curie',
    title: 'a title 2',
    url_m: 'http://lorempixel.com/400/200/sports/2/ '
  });

  picturesMock.push({
    id: 'cccc',
    owner: 'mans zelmerlow',
    title: 'a title 3',
    url_m: 'http://lorempixel.com/400/200/sports/2/ '
  });
});
