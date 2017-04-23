import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

const { Component, computed, inject, isBlank } = Ember;

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'time-bootstrap',
  fieldSettings: inject.service(),
  showButton: true,
  isInputGroup: computed('showButton', 'hasPrefix', 'hasSuffix', function(){
    return this.get('showButton') || this.get('hasPrefix') || this.get('hasSuffix');
  }),

  momentFormat: computed('format', 'fieldSettings.timeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.timeFormat');
    } else {
      return format;
    }
  }),

  didInsertElement: function() {
    var domElement = this.$('input');
    domElement.datetimepicker({
      format: this.get('momentFormat')
    });
  },

  actions: {
    toggleCalendar: function(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
