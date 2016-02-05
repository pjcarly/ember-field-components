import Ember from 'ember';
import NumberComponent from '../mixins/component-number';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(NumberComponent, OutputComponent);