import Ember from 'ember';

export default Ember.Helper.helper(function([model, field]) {
  return model.belongsTo(field).value();
});
