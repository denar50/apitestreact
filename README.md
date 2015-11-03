# Edgar's test

The current test project fetches images from flickr by using its API and passing it parameters like tag and page. 
This application was built using the Flux architechture with Reflux.js as the framework to implement flux. 

### Architecture
Actions:

- *RefreshAction*: contains the following events: 
    - *triggerRefresh*
    - *refreshPictures*: the RefreshAction also listens to this action in order to retrieve the pictures from the API asynchronously and call *refreshPicturesCompleted* or *refreshPicturesFailed* depending on the promise returned by *FlickerResource.fetchAll*.
    - *refreshPicturesCompleted*
    - *refreshPicturesFailed*


- *PageChangeAction*: contains the following events:
    - *changePage*


- *CathegoryChangeAction*: contains the following events:
    - *toggleCathegory*

Stores:

- *PicturesStore*: contains the state of the application. It listens to all the actions mentioned above and implement handlers for every event in those actions. The store also has a *cathegories* object which represents the tags to filter the pictures retrieved from the *FlickerResource*. By default there are three cathegories (tags): cats, dogs and birds. 

Components:

- *PicturesMainContainer*: holds all the application. It contains a *PictureTagsFilter* and a *PicturesGallery*. This main container connects to the store and so reads from the store the *page* (current displaying page), *pages* (number of total pages returned by the *FlickerResource*), *pictures* (array of object containing the pictures retrieved from the *FlickerResource*) and *cathegories* (see above). This main container connects to the store and whenever the store triggers a refresh this component will then re-render based on the state of the application found in the store.

- *PictureTagsFilter*: displays a checkbox for every cathegory defined in *PicturesStore*. Whenever these checkboxes are the component executes an event passed in by the pro
### How does it work?

The application begins by rendering the component *PicturesMainContainer* and then initializes all the Actions and Stores. This application has only one store called *PictureStore* containing the state of the application. When this store is initialized it will trigger the event 