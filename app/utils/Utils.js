var Utils = (function(){
  return {
    isFunction: function(theFunction)
    {
      return theFunction && {}.toString.call(theFunction) === '[object Function]';
    },
    fileIsImage: function(theFile)
    {
      return (theFile.name || false) && theFile.name.match(/\.(jpg|jpeg|png|gif)$/);
    },
    isAnEmptyField: function(object, field)
    {
      return !object[field] || (object[field] + '').trim().length === '';
    },
    isUndefined: function(variable)
    {
      return typeof variable === 'undefined';
    },
    isDefined: function(variable)
    {
      return !this.isUndefined(variable);
    }
  };
})();

module.exports = Utils;
