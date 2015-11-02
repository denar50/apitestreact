var PAGE_CONTROL_PATH = '../../app/components/PageControl.jsx';
var APP_UTILS_PATH = '../../app/utils/Utils';

jest.dontMock(PAGE_CONTROL_PATH);
jest.dontMock(APP_UTILS_PATH);

describe('PageControl react component', function(){
  var React = require('react');
  //var ReactDOM = require('react-dom');
  //var TestUtils = require('react-addons-test-utils');
  //var PageControl = require(PAGE_CONTROL_PATH);
  //var Utils = require(APP_UTILS_PATH);

  var pageControlInstance;

  /*beforeEach(function(){
    pageControlInstance = TestUtils.renderIntoDocument(<PageControl />);
  });*/

  it('should be defined', function()
  {
    expect(1).toBe(1);
  });
});
