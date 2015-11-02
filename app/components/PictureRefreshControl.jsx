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
    return <div className="filters-container row">
      <div className="filter">
        <label htmlFor="dogs">Dogs</label>
        <input name="dogs" type="checkbox" checked={this.props.cathegories.dogs} onClick={this.toggleCathegory.bind(this, 'dogs')} />
      </div>
      <div className="filter">
        <label htmlFor="cats">Cats</label>
        <input name="cats" type="checkbox" checked={this.props.cathegories.cats} onClick={this.toggleCathegory.bind(this, 'cats')} />
      </div>
      <div className="filter">
        <label htmlFor="sports">Sports</label>
        <input name="sports" type="checkbox" checked={this.props.cathegories.sports} onClick={this.toggleCathegory.bind(this, 'sports')} />
      </div>
      <div className="filter">
        <button className="btn refresh" onClick={this.refresh}>Refresh</button>
      </div>
    </div>;
  }

});

module.exports = PictureRefreshControl;
