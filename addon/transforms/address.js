import Ember from 'ember';
import DS from 'ember-data';
import Address from '../objects/address';

export default DS.Transform.extend({
  serialize: function(value) {

    if (Ember.isNone(value)) {
      return [];
    }

    return {
      thoroughfare: value.street,
      postal_code: value.postalCode,
      locality: value.city,
      administrative_area: value.state,
      country: value.country
    };
  },
  deserialize: function(value) {

    var address = Address.create({
      street: value.thoroughfare,
      postalCode: value.postal_code,
      city: value.locality,
      state: value.administrative_area,
      country: value.country
    });

    return address;
  }
});