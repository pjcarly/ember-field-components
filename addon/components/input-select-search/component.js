import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

const { Component, computed, isBlank } = Ember;

export default Component.extend(InputComponent, {
  type: 'select-search',
  emptyValue: computed('value', function(){
    return isBlank(this.get('value'));
  }),
  didInsertElement: function() {
    var domElement = this.$('select');
    domElement.selectpicker();
  },
  didUpdateAttrs(attrs){
    this._super(...arguments);

    if(attrs.newAttrs.value.value !== attrs.oldAttrs.value.value) {
      this.$('select').selectpicker('val', this.get('value'));
    }
  },
  actions: {
    valueChanged: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
