/**
* Just a helper object that will hold generic logic that is not part of the business logic
*/
var Utils = (function(){
  return {
    isFunction: function(theFunction)
    {
      return theFunction && {}.toString.call(theFunction) === '[object Function]';
    },
    truncateText: function(text, maxCharCount)
    {
      if(text.length > maxCharCount)
      {
        text = text.substring(0, maxCharCount - 1) + '...';
      }
      return text;
    }
  };
})();

module.exports = Utils;
