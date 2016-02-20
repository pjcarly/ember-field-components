import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'select-search',
  emptyValue: Ember.computed('value', function(){
    return Ember.isBlank(this.get('value'));
  }),
  didInsertElement: function() {
    var domElement = this.$('select');
    domElement.selectpicker();
  },
  actions: {
    valueSelected: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
