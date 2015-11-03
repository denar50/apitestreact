var PAGE_CONTROL_PATH = '../../app/components/PageControl.jsx';
var APP_UTILS_PATH = '../../app/utils/Utils';

jest.dontMock(PAGE_CONTROL_PATH);
jest.dontMock(APP_UTILS_PATH);

describe('PageControl react component', function(){
  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');
  var PageControl = require(PAGE_CONTROL_PATH);
  var Utils = require(APP_UTILS_PATH);

  var pageControlInstance, pagesLinkElements;
  //Mocks
  var mocksObject = {
    onPageChange : function(page){}
  };

  function generateTestCase(page, pages, offset)
  {
    pageControlInstance = TestUtils.renderIntoDocument(<PageControl page={page} pages={pages} offset={offset} onPageChange={mocksObject.onPageChange} />);
    pagesLinkElements = TestUtils.scryRenderedDOMComponentsWithClass(pageControlInstance, 'page-link');
  }

  describe('A component that updates the page correctly', function(){
    beforeEach(function(){
      spyOn(mocksObject, 'onPageChange');
      generateTestCase(5, 20, 2);
    });

    it('Should render the right amount of links', function()
    {
      expect(pagesLinkElements.length).toBe(7); //two links on each side of the 5 and the two arrows
    });

    it('Should call the onPageChange method with the right value when the left arrow is pressed', function()
    {
      TestUtils.Simulate.click(pagesLinkElements[0]);
      setTimeout(function(){
        expect(mocksObject.onPageChange).toHaveBeenCalledWith(4); //one position to the left from page 5
      }, 0);
      jest.runAllTimers();
    });

    it('Should call the onPageChange method with the right value when the right arrow is pressed', function()
    {
      TestUtils.Simulate.click(pagesLinkElements[pagesLinkElements.length - 1]);
      setTimeout(function(){
        expect(mocksObject.onPageChange).toHaveBeenCalledWith(6); //one position to the right from page 5
      }, 0);
      jest.runAllTimers();
    });

    it('Should call the onPageChange method with the right value for page 3', function()
    {
      TestUtils.Simulate.click(pagesLinkElements[1]);
      setTimeout(function(){
        expect(mocksObject.onPageChange).toHaveBeenCalledWith(3); //Click on page 3
      }, 0);
      jest.runAllTimers();
    });
  });


  it('Should display the right amount of elements when the offset is not defined (4 is the default)', function()
  {
    generateTestCase(5, 20);
    expect(pagesLinkElements.length).toBe(10); //4 links on the left of page 5 and 4 links plus the right arrow on the right.
  });

  it('Should display the right amount of elements when the page equals the last page', function()
  {
    generateTestCase(20, 20);
    expect(pagesLinkElements.length).toBe(10); //8 links on the left of page 20 and the left arrow
  });

  it('Should display the right amount of elements when the page equals the first page', function()
  {
    generateTestCase(1, 20);
    expect(pagesLinkElements.length).toBe(10); //8 links on the right of page 1 and the right arrow
  });

  it('Should display zero links when the page param is falsy', function()
  {
    generateTestCase(0, 20);
    expect(pagesLinkElements.length).toBe(0);
  });

  it('Should display zero links when the pages param is falsy', function()
  {
    generateTestCase(5, 0);
    expect(pagesLinkElements.length).toBe(0);
  });

});
//Jest works on Node v0.10.40
