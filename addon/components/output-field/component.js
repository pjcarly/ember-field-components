import Ember from 'ember';
import FieldComponent from '../../mixins/component-field';

const { Component } = Ember;

export default Component.extend(FieldComponent, {
  fieldType: 'output'
});
