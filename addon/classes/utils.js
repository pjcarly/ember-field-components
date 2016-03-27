import Ember from 'ember';

/**
 * Determines the model type name
 *
 * @param  {*}  value
 * @return {Boolean}
 */
export function getModelNameFromModel(model) {
  if (!Ember.isBlank(model)) {
    return model.constructor.modelName;
  }
}

/**
 * Determines whether or not a value is empty
 *
 * @param  {*}  value
 * @return {Boolean}
 */
export function appendWithZeroes(number, length) {

  var zeros = '';
  while (zeros.length < length) {
    zeros = zeros + '0';
  }

  return number + '' + zeros;
}

export function getNewValue(value) {
  // todo: let this work to determine whether the value a input field wants to change to is allowed, and set it to the allowed value
  // used for numeric fields for example, if we click the decrement button, and it can only be a positive number, than it shouldnt go under 0
  // import DecimalsValidator from '../../ember-attribute-validations/validators/decimals';

  return value;
}

export function getParam(query) {
  var param = '';

  for (var key in query) {
    if (query.hasOwnProperty(key)) {
      var normalizedKey = Ember.String.underscore(key);
      var value = query[key];

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        param += '[' + normalizedKey + ']' + getParam(value);
      } else {
        param += '[' + normalizedKey + ']' + '=' + value;
      }
    }
  }

  return param;
}
