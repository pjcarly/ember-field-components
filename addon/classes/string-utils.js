import Ember from 'ember';

export function getStringBeforeFirstDot(value) {
  if (!Ember.isBlank(value)) {
    var positionOfFirstDot = value.indexOf('.');
    return left(value, positionOfFirstDot);
  }
  return value;
}


export function left(value, count) {
  return value.substring(0, count);
}