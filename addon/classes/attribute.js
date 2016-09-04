import Ember from 'ember';
import DS from 'ember-data';
import { isNumeric } from 'ember-attribute-validations/utils';

export function setType(type, options) {
  var defaultOptions = {};
  var defaultValidations = {};

  // Depending on the type, lets set default values
  switch (type) {
    case 'number':
    case 'price':
    case 'percent':
      var precision, decimals;

      if (!Ember.isNone(options)) {
        if (options.hasOwnProperty('precision')) {
          precision = parseInt(options.precision);
        }
        if (options.hasOwnProperty('decimals')) {
          decimals = parseInt(options.decimals);
        }
      }

      Ember.assert('Decimals cannot be larger than precision', (precision > decimals));
      Ember.assert('No number precision defined', !Ember.isEmpty(precision));
      Ember.assert('No number decimals defined', !Ember.isEmpty(decimals));
      Ember.assert('Number precision not numeric', isNumeric(precision));
      Ember.assert('Number decimals not numeric', isNumeric(decimals));

      defaultValidations = {
        number: true,
        precision: precision,
        decimals: decimals
      };

      if (decimals === 0) {
        defaultValidations.wholenumber = true;
        delete defaultValidations.decimals;
      }
      break;
    case 'email':
      defaultValidations = {
        email: true
      };
      break;
    case 'string':
      defaultValidations = {
        max: 255
      };
      break;
    case 'link':
      defaultValidations = {
        url: true
      };
      break;
  }


  // Now we have our default validations and or options
  defaultOptions = Ember.merge(defaultOptions, options);
  if (!Ember.isBlank(defaultValidations)) {
    if (!Ember.isBlank(options) && options.hasOwnProperty('validation')) {
      defaultOptions.validation = Ember.merge(options.validation, defaultValidations);
    } else {
      defaultOptions.validation = defaultValidations;
    }
  }

  // And return the DS attribute with the options
  return DS.attr(type, defaultOptions);
}
