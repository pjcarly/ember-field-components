import Ember from 'ember';
import DS from 'ember-data';
import { isNumeric } from 'ember-attribute-validations/utils';
import { lookup } from 'ember-dependency-lookup';

const { assert, merge, isBlank, isEmpty } = Ember;
const { attr } = DS;

export function setType(type, options) {
  var defaultOptions = {};
  var defaultValidations = {};

  // Depending on the type, lets set default values
  switch (type) {
    case 'number':
    case 'price':
    case 'percent':
      var precision, decimals;

      if (!isBlank(options)) {
        if (options.hasOwnProperty('precision')) {
          precision = parseInt(options.precision);
        }
        if (options.hasOwnProperty('decimals')) {
          decimals = parseInt(options.decimals);
        }
      }

      assert('Decimals cannot be larger than precision', (precision > decimals));
      assert('No number precision defined', !isEmpty(precision));
      assert('No number decimals defined', !isEmpty(decimals));
      assert('Number precision not numeric', isNumeric(precision));
      assert('Number decimals not numeric', isNumeric(decimals));

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
    case 'currency':
      const fieldSettings = lookup('service:field-settings');

      defaultOptions['defaultValue'] = fieldSettings.get('defaultCurrency');
      break;
    case 'email':
      defaultValidations = {
        email: true,
        max: 255
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
  defaultOptions = merge(defaultOptions, options);
  if (!isBlank(defaultValidations)) {
    if (!isBlank(options) && options.hasOwnProperty('validation')) {
      defaultOptions.validation = merge(options.validation, defaultValidations);
    } else {
      defaultOptions.validation = defaultValidations;
    }
  }

  // And return the DS attribute with the options
  return attr(type, defaultOptions);
}
