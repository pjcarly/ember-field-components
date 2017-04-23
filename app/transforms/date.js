/* global moment */
import DS from 'ember-data';

const { Transform } = DS;
const { isBlank } = Ember;

// Converts centigrade in the JSON to fahrenheit in the app
export default Transform.extend({
  deserialize: function(serialized) {
    return moment(serialized).toDate();
  },
  serialize: function(deserialized) {
    if (isBlank(deserialized)) {
      return null;
    }

    return moment(deserialized).format('YYYY-MM-DD');
  }
});
