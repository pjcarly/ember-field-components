import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var fieldName = params.get(0);
  var modelType = params.get(1);

  if (modelType.settings.labels && modelType.settings.labels.hasOwnProperty(fieldName)) {
    return modelType.settings.labels[fieldName];
  } else {
    return fieldName.capitalize();
  }
});