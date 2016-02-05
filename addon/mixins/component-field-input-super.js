import Ember from 'ember';
import FieldComponentSuper from '../mixins/component-field-super';
import DynamicObserverComponent from '../mixins/component-dynamic-observer';

export default Ember.Mixin.create(FieldComponentSuper, DynamicObserverComponent);