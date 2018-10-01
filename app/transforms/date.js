/* global moment */
import DS from 'ember-data';

const { Transform } = DS;
import { isBlank } from '@ember/utils';

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
