var Reflux = require('reflux');
var RefreshAction = require('../actions/RefreshAction');
var ShowItemAction = require('../actions/ShowItemAction');
var CathegoryChangeAction = require('../actions/CathegoryChangeAction');
var FlickerResource = require('../resources/FlickerResource');
var PageChangeAction = require('../actions/PageChangeAction');
/**
* This store subscribes to the PetActions and implement the actions that PetActions espeficy.
*
*/
var PicturesStore = Reflux.createStore({
  listenables: [RefreshAction, ShowItemAction, CathegoryChangeAction, PageChangeAction],
  currentPicture: null,
  init: function()
  {
    this.currentPicture= null;
    this.picturesPerPage= FlickerResource.picturesPerPage;
    this.cathegories=
    {
      cats: false,
      dogs: false,
      sports: false
    };
    this.page = 0;
    this.pages = 0;
  },
  changePage: function(page)
  {
    this.page = page;
    this.pictures = undefined;
    this.triggerRefresh();
  },
  triggerRefresh: function()
  {
    var params = {};
    params.page = this.page;
    params.tags = this.getTagsArray();
    RefreshAction.refreshPictures(params);
  },
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
  },
  toggleCathegory: function(cathegory)
  {
    this.cathegories[cathegory] = !this.cathegories[cathegory];
    this.trigger(this);
  },
  refreshPictures: function()
  {
    this.trigger(this);
  },
  refreshPicturesCompleted: function(data)
  {
    this.pictures = data.photo;
    this.page = data.page;
    this.pages = data.pages;
    this.trigger(this);
  },

  refreshPicturesFailed: function()
  {
  }

});

module.exports = PicturesStore;
