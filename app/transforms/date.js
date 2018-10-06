/* global moment */
import Transform from 'ember-data/transform';
import { isBlank } from '@ember/utils';

// Converts centigrade in the JSON to fahrenheit in the app
export default Transform.extend({
  deserialize(serialized) {
    if(isBlank(serialized)){
      return null;
    }

    return moment(serialized).toDate();
  },
  serialize(deserialized) {
    if (isBlank(deserialized)) {
      return null;
    }

    return moment(deserialized).format('YYYY-MM-DD');
  }
});
