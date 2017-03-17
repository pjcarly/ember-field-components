/* global moment */
import DS from 'ember-data';

// Converts centigrade in the JSON to fahrenheit in the app
export default DS.Transform.extend({
  deserialize: function(serialized) {
    return moment(serialized).toDate();
  },
  serialize: function(deserialized) {
    if (Ember.isBlank(deserialized)) {
      return null;
    }

    return moment(deserialized).format('YYYY-MM-DD');
  }
});
