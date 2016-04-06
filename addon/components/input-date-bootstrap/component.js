import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

export default Ember.Component.extend(InputComponent, InputMomentFormat, {
  type: 'date-bootstrap',
  fieldSettings: Ember.inject.service(),
  isInputGroup: true,

  momentFormat: Ember.computed('format', 'fieldSettings.dateFormat', function(){
    let format = this.get('format');
    if(Ember.isBlank(format)){
      return this.get('fieldSettings.dateFormat');
    } else {
      return format;
    }
  }),

  didInsertElement: function() {
    let domElement = this.$('input');
    domElement.datetimepicker({
      format: this.get('momentFormat')
    });

    if(!Ember.isBlank(this.get('minDate'))){
      domElement.data('DateTimePicker').minDate(this.get('minDate'));
    } else {
      domElement.data('DateTimePicker').minDate(false);
    }

    if(!Ember.isBlank(this.get('maxDate'))){
      domElement.data('DateTimePicker').maxDate(this.get('maxDate'));
    } else {
      domElement.data('DateTimePicker').maxDate(false);
    }
  },

  minDateObserver: Ember.observer('minDate', function(){
    let domElement = this.$('input');
    this.sendAction('valueChanged', this.get('minDate'));

    if(!Ember.isBlank(this.get('minDate'))){
      domElement.data('DateTimePicker').minDate(this.get('minDate'));
    } else {
      domElement.data('DateTimePicker').minDate(false);
    }
  }),

  maxDateObserver: Ember.observer('maxDate', function(){
    let domElement = this.$('input');
    this.sendAction('valueChanged', this.get('maxDate'));

    if(!Ember.isBlank(this.get('maxDate'))){
      domElement.data('DateTimePicker').maxDate(this.get('maxDate'));
    } else {
      domElement.data('DateTimePicker').maxDate(false);
    }
  }),

  actions: {
    toggleCalendar: function(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
