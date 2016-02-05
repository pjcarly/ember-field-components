import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    if (Ember.isNone(value)) {
      return [];
    } else if (!value.startsWith('http://')) {
      value = 'http://' + value;
    }
    return {
      url: value
    };
  },
  deserialize: function(value) {
    return value.url;
  }
});