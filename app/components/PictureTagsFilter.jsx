var React = require('react');
var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var $ = require('jquery');

/**
* Renders checkboxes representing the tags to filter the pictures when retrieving them from the server
*/
var PictureTagsFilter = React.createClass({
  /**
  * Event handler for when a filter representing a tag is toggled (checked/unchecked).
  *
  * @param {string} cathegory the name of the tag that is being toggled
  */
  toggleCathegory: function(cathegory)
  {
    this.props.onToggleCathegory(cathegory);
  },
  
  /**
  * Creates a checkbox for every cathegory contained in the object cathegories defined in the props of this component
  * Every checkbox has bound to it a toggle event handler for when its value is changed (checked or unchecked)
  */
  render: function()
  {
    var cathegoryElements = [];
    var cathegoriesObject = this.props.cathegories;
    for(var key in cathegoriesObject)
    {
      if(cathegoriesObject.hasOwnProperty(key))
      {
        cathegoryElements.push(
          <div key={key} className="filter">
            <label htmlFor={key}>{key}</label>
            <input name={key} type="checkbox" checked={this.props.cathegories[key]} onChange={this.toggleCathegory.bind(this, key)} />
          </div>
        );
      }
    }
    return <div className="filters-container row">
      <span>Please choose a tag: </span>
        {cathegoryElements}
    </div>;
  }

});

module.exports = PictureTagsFilter;
