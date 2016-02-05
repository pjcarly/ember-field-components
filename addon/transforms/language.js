import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
    if (Ember.isBlank(deserialized)) {
      return [];
    } else {
      return {
        value: deserialized
      };
    }
  },
  deserialize: function(serialized) {
    if (!Ember.isBlank(serialized)) {
      return serialized.value;
    } else {
      return null;
    }
  }
});