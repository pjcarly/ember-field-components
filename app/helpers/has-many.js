import Ember from 'ember';

const { helper } = Ember.Helper;

export default helper(function([model, field]) {
  return model.hasMany(field).value();
});
