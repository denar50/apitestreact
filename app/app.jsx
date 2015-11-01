var reactDOM = require('react-dom'); 
var React = require('react');
var PicturesMainContainer = require('../app/components/PicturesMainContainer.jsx');
var $ = require('jquery');
var RefreshAction = require('./actions/RefreshAction');

var mainConatiner = $('#main-container')[0];

reactDOM.render(<PicturesMainContainer />, mainConatiner);

RefreshAction.triggerRefresh();