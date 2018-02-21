/* global moment */
import Ember from 'ember';
import DS from 'ember-data';

const { Transform } = DS;
const { isBlank } = Ember;

// Converts centigrade in the JSON to fahrenheit in the app
export default Transform.extend({
  deserialize: function(serialized) {
    if(isBlank(serialized)){
      return null;
    }

    return moment(serialized).toDate();
  },
  serialize: function(deserialized) {
    if (isBlank(deserialized)) {
      return null;
    }

    return moment(deserialized).format('YYYY-MM-DD');
  }
});
