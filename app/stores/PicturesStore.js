var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var FlickerResource = require('../resources/FlickerResource');
var PageChangeAction = require('../actions/PageChangeAction');


var PicturesStore = Reflux.createStore({
  //subscribes to RefreshAction, CathegoryChangeAction and PageChangeAction
  listenables: [RefreshAction, CathegoryChangeAction, PageChangeAction],
  /**
  * Creates the cathegories object which will represent the tags by which the user will be able to filter the pictures.
  * Sets initial values. Triggers the triggerRefresh event defined in RefreshAction.
  */
  init: function()
  {
    this.picturesPerPage= FlickerResource.picturesPerPage;
    this.cathegories=
    {
      cats: false,
      dogs: false,
      birds: false
    };
    this.page = 0;
    this.pages = 0;
    RefreshAction.triggerRefresh();
  },
  
  /**
  * Event handler for the event PageChangeAction.changePage. Receives the page that the user requested adn triggers RefreshAction.triggerRefresh
  * Updates its page attribute.
  * @param {number} page the page that the user requested
  */
  changePage: function(page)
  {
    this.page = page;
    RefreshAction.triggerRefresh();
  },
  
  /**
  * Event handler for the event RefreshAction.triggerRefresh.
  * Creates the params object using its "page" attribute and an array of tags generated based on its "cathegories" attribute.
  * Finally triggers the RefreshAction.refreshPictures event by passing in the params object.
  */
  triggerRefresh: function()
  {
    var params = {};
    params.page = this.page;
    params.tags = this.getTagsArray();
    RefreshAction.refreshPictures(params);
  },
  
  /**
  * handles the CathegoryChangeAction.toggleCathegory event. Updates the toggled cathegorie and then triggers the RefreshAction.triggerRefresh event.
  *
  * @param {string} cathegory representing the key of a member of the cathegory object to toggle
  */
  toggleCathegory: function(cathegory)
  {
    this.cathegories[cathegory] = !this.cathegories[cathegory];
    RefreshAction.triggerRefresh();
  },
  
  /**
  * Event handler for the event RefreshAction.refreshPictures. Triggers a view refresh.
  */
  refreshPictures: function()
  {
    this.trigger(this);
  },
  
  /**
  * Event handler for the event RefreshAction.refreshPicturesCompleted. Updates the state that this store keeps and then triggers a view refresh.
  *
  * @param {object} data contains the data returned by the FlickerResource
  */
  refreshPicturesCompleted: function(data)
  {
    this.pictures = data.photo;
    this.page = data.page;
    this.pages = data.pages;
    this.trigger(this);
  },
  
  /**
  * Creates an array of tags based on the properties of the cathegory object that equal true.
  */
  getTagsArray: function()
  {
    var cathegories = this.cathegories;
    var tags = [];
    for(var cathegory in cathegories)
    {
      if(cathegories.hasOwnProperty(cathegory))
      {
        if(cathegories[cathegory] === true)
        {
          tags.push(cathegory);
        }
      }
    }
    return tags;
  }
});

module.exports = PicturesStore;
