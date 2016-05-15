import Ember from 'ember';
import ModelUtils from 'ember-field-components/classes/model-utils';

export default Ember.Helper.helper(function([model, modelType]) {
  let nameColumn = ModelUtils.getNameColumn(modelType);
  return model.get(nameColumn);
});
