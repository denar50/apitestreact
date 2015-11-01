var React = require('react');
var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var $ = require('jquery');

var PictureRefreshControl = React.createClass({
  
  refresh: function()
  {
    this.props.onRefresh();
  },
  toggleCathegory: function(cathegory)
  {
    this.props.onToggleCathegory(cathegory);
  },
  render: function()
  {
    return <div>
      <label htmlFor="dogs">Dogs</label>
      <input name="dogs" type="checkbox" checked={this.props.cathegories.dogs} onClick={this.toggleCathegory.bind(this, 'dogs')} />
      
      <label htmlFor="cats">Cats</label>
      <input name="cats" type="checkbox" checked={this.props.cathegories.cats} onClick={this.toggleCathegory.bind(this, 'cats')} />
      
      <label htmlFor="sports">Sports</label>
      <input name="sports" type="checkbox" checked={this.props.cathegories.sports} onClick={this.toggleCathegory.bind(this, 'sports')} />
      <button onClick={this.refresh}>Refresh</button>
      </div>;
  }

});

module.exports = PictureRefreshControl;


