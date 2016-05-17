import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

export default Ember.Component.extend(InputComponent, InputMomentFormat, {
  type: 'datetime-bootstrap',
  fieldSettings: Ember.inject.service(),
  showButton: true,
  isInputGroup: Ember.computed('showButton', 'hasPrefix', 'hasSuffix', function(){
    return this.get('showButton') || this.get('hasPrefix') || this.get('hasSuffix');
  }),

  momentFormat: Ember.computed('format', 'fieldSettings.dateTimeFormat', function(){
    let format = this.get('format');
    if(Ember.isBlank(format)){
      return this.get('fieldSettings.dateTimeFormat');
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
