var React = require('react');
var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var $ = require('jquery');

var PictureRefreshControl = React.createClass({
  getInitialState: function()
  {
    return {
      cathegories: {
        cats: false,
        dogs: false,
        sports: false
      }
    };
  },
  refresh: function()
  {
    var cathegories = this.state.cathegories;
    var tags = [];
    for(var cathegory in cathegories)
    {
      if(cathegories.hasOwnProperty(cathegory) && cathegories[cathegory] === true)
      {
        tags.push(cathegory);
      }
    }    
    RefreshAction.refreshPictures(tags);
  },
  toggleCathegory: function(event)
  {
    debugger;
    var cathegory = $(event.target).attr('name');
    var cathegories = this.state.cathegories;
    cathegories[cathegory] = !cathegories[cathegory];
    this.setState({cathegories: cathegories});
  },
  render: function()
  {
    return <div>
      <label htmlFor="dogs">Dogs</label>
      <input name="dogs" type="checkbox" checked={this.state.cathegories.dogs} onClick={this.toggleCathegory} />
      
      <label htmlFor="cats">Cats</label>
      <input name="cats" type="checkbox" checked={this.state.cathegories.cats} onClick={this.toggleCathegory} />
      
      <label htmlFor="sports">Sports</label>
      <input name="sports" type="checkbox" checked={this.state.cathegories.sports} onClick={this.toggleCathegory} />
      <button onClick={this.refresh}>Refresh</button>
      </div>;
  }

});

module.exports = PictureRefreshControl;


