import FieldComponentSuper from '../mixins/component-field-super';
import DynamicObserverComponent from '../mixins/component-dynamic-observer';
import Mixin from '@ember/object/mixin';

export default Mixin.create(FieldComponentSuper, DynamicObserverComponent);
