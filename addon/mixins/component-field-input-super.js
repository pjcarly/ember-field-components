import Ember from 'ember';
import FieldComponentSuper from '../mixins/component-field-super';
import DynamicObserverComponent from '../mixins/component-dynamic-observer';

const { Mixin } = Ember;

export default Mixin.create(FieldComponentSuper, DynamicObserverComponent);
