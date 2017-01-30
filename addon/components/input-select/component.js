import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'select',
  hasPrefix: false,
  hasSuffix: false,
  showNone: Ember.computed('value', 'isRequired', function(){
    return Ember.isBlank(this.get('value')) || !this.get('isRequired');
  }),
  noneDisabled: Ember.computed('value', 'isRequired', function(){
    return Ember.isBlank(this.get('value')) && this.get('isRequired');
  }),
  noneSelected: Ember.computed('value', 'isRequired', function(){
    return Ember.isBlank(this.get('value')) && this.get('isRequired');
  }),
  noneLabel: Ember.computed('none', function(){
    return Ember.isBlank(this.get('none')) ? '-- None --' : this.get('none');
  }),
  computedValue: Ember.computed('value', function(){
    let value = this.get('value');
    if(!Ember.isBlank(value)){
      return this.get('value').toString();
    }
  }),
  actions: {
    valueChanged: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
