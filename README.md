# Edgar's test

The current test project fetches images from flickr by using its API and passing it parameters like tag and page. 
This application was built using the Flux architechture with Reflux.js as the framework to implement flux. 
## Technology and dev tools
This application was build using:
- react 
- reflux
- d3
- jquery 

The css is written in *Sass*

Developer tools:
- Grunt: To execute automated tasks. There are two main tasks:
    - *build* will compile the sass files into the file *assets/css/app.css*, run the browserify task to generate the *build.js* file containing all the frontend logic of the application, and finally run processhtml to generate the *index.html* file. Use *build* for developing.
    - *release* will compile the sass files and run browserify like *build*, run the *uglify* task to obfuscate the javascript code and produce *build.min.js*, then it will run processhtml to generate the *index.html* file for production. 
- babel: to compile ES6 (I only used ```module.exports```) and the .jsx files.
- browserify: to encapsulate all the logic in modules that can be *required*.
- jest: for unit testing
## Installation
Open a command line and run:

```
npm install
grunt release
node server server.js
```
Then open your browser on http://localhost:3000 to see the site.

If you don't want to see the minified version of the code, use  ``` grunt build ``` instead of ``` grunt release ```

## Architecture
##### Actions:

- *RefreshAction*: contains the following events: 
    - *triggerRefresh*
    - *refreshPictures*: the RefreshAction also listens to this action in order to retrieve the pictures from the API asynchronously and call *refreshPicturesCompleted* or *refreshPicturesFailed* depending on the promise returned by *FlickerResource.fetchAll*.
    - *refreshPicturesCompleted*
    - *refreshPicturesFailed*


- *PageChangeAction*: contains the following events:
    - *changePage*


- *CathegoryChangeAction*: contains the following events:
    - *toggleCathegory*

##### Stores:

- *PicturesStore*: contains the state of the application. It subscribes to all the actions mentioned above and implement handlers for every event in those actions. The store also has a *cathegories* object which represents the tags to filter the pictures retrieved from the *FlickerResource*. By default there are three cathegories (tags): cats, dogs and birds. 

##### Components:

- *PicturesMainContainer*: holds all the application. It contains a *PictureTagsFilter* and a *PicturesGallery*. This main container connects and reads from it the attributes: *page* (current displaying page), *pages* (number of total pages returned by the *FlickerResource*), *pictures* (array of object containing the pictures retrieved from the *FlickerResource*) and *cathegories* (see above). Whenever the store's "trigger" method is called this component will then re-render based on the state of the application found in the store. This component passes to the *PictureTagsFilter* the *cathegories* and a callback called *toggleCathegory* that will trigger the event *CathegoryChangeAction.toggleCathegory* which is expected to refresh the pictures immediately.

- *PictureTagsFilter*: Receives a *cathegories* object and an *onToggleCathegory* callback. Displays a checkbox for every cathegory. Whenever a checkbox is ticked or unticked this will execute the *onToggleCathegory* callback passing it the key of the cathegory to be toggled.

- *PicturesGallery*:  Receives the array of *pictures*, the *page* and the number of *pages* and renders a *PageControl* and draws the pictures gallery by using the function *drawPicturesGallery*. This component stores all the ids of the *pictures* to decide whether updating or not when a new *pictures* array is received. It won't update if the ids contained in *pictures* are the same.

- *PageControl*: receives the *page*, *pages* and a callback for when a new page is requested. An optional parameter *offset* will affect the number of links displayed (4 is the default offset). The current page link will have the class "selected". Examples: 
    - page = 5, pages = 10, offset = 2 will render the following links: < 3 4 5 6 7 > (The current page in the center, two links on its left and right and arrows for when there are more links on either side.
    - page = 1, pages = 2 will render the following links: 1 2
    - page = 20, pages = 20 will render the following links: < 12 13 14 15 16 17 18 19 20

##### D3
For this test a small D3 function is created and it draw the pictures gallery. It expects an array of *pictures* and the selector of the container in which the gallery is going to be drawn. Every picture in the gallery will zoom in on hover and will display a truncated version of the title of the image (if it's not empty). When a picture is clicked it will open a new tab in the browser to display this specific picture on Flickr.

##### Resources
- *FlickerResource*: This resource encapsulates the interaction with the Flickr API and exposes the following methods:
    -  *fetchAll*: receives a *params* (optional) containing *tags* (array of strings representing tags. E.g: ['dogs', 'birds']) and  a *page* for the requested page. Returns a promise. If called multiple times, it will only resolve the last promised it received.

## How does it work?
The application begins by rendering the component *PicturesMainContainer* and then initializes all the Actions and Stores. This application has only one store called *PictureStore* containing the state of the application. When this store is initialized it will trigger the event *RefeshAction.triggerRefresh* to fetch the pictures from the API. Once fetch the application will show the gallery of pictures. The user will then be able to interact with the gallery and also request new pictures by either checking or unchecking the checkboxes representing the cathegories on the top, or clicking a new page.

## Why this approach?
I am a big fan of the pub/sub design pattern and Flux is a simple and yet powerful architecture for developing applications that is based on it. Reflux is a framework based on Flux that integrates perfectly with react. Reflux allows me to see this application in terms of events that can be triggered by the user or the application and also helps me to keep a consistent state of the application easing the creation of stateless react components.

I created an object called FlickrResource (singleton) for simplicity to encapsulate the logic of the interaction with the Flickr API.

Modular programming is powerful. Encapsulating common logic in modules gives a tremendous power to the developer in terms of maintainability and scalability. In AngularJS there's dependency injection for that. Unfortunately reflux doesn't have such a thing. So in order to use modules I used Browserify. Browserify creates a bundle javascript file for the application with all the javascript files. Thus I only have to create one script tag in the index.html file for the application. you can also write your entire code in ES6, coffeescript, jsx, etc. And Browserify lets you preprocess your scripts (to convert JSX files to JS, to parse ES6 to ES5, etc) before creating the bundle. 

## Cons
The main problem with reflux and react itself is the lack of broad documentation and tutorials to ease the learning process. With reflux for example I found myself asking questions in stackoverflow about good practices or the correct approach to solve a particual problem. With this is mind it is very likely to find oneself hardcoding antipaterns that will make the application hard to maintain.

Hardcoding things like resources is prone to errors that will impact maintainability and escalability in the long term.

The bundle javascript file generated by browserify can become too heavy in large applications and this impacts the user experience. 
## TODOs
- Implement all the tests for the application.
- Find a library to create resources and replace my hardcoded *FlickerResource*
- See better alternatives for implenting promises (I'm currently using jQuery for that)
- Find a way to execute jest unit tests on the current version of node.
- Enhance the user experience in mobile devices.

## Unit tests
There are two sample unit tests: *components/PageControl.js* and *components/PicturesGallery.js*. They should be run by using the command: npm test

Please use node v0.10.40 for running the tests.
