import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

export default Ember.Component.extend(InputComponent, InputMomentFormat, {
  type: 'date-bootstrap',
  fieldSettings: Ember.inject.service(),
  showButton: true,
  isInputGroup: Ember.computed('showButton', 'hasPrefix', 'hasSuffix', function(){
    return this.get('showButton') || this.get('hasPrefix') || this.get('hasSuffix');
  }),

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

  didUpdateAttrs(attrs){
    this._super(...arguments);

    // if minDate changed, we update the component
    if(attrs.newAttrs.minDate.value !== attrs.oldAttrs.minDate.value) {
      let domElement = this.$('input');

      if(!Ember.isBlank(this.get('minDate'))){
        domElement.data('DateTimePicker').minDate(this.get('minDate'));
      } else {
        domElement.data('DateTimePicker').minDate(false);
      }
    }

    // same with maxDate
    if(attrs.newAttrs.maxDate.value !== attrs.oldAttrs.maxDate.value) {
      let domElement = this.$('input');

      if(!Ember.isBlank(this.get('maxDate'))){
        domElement.data('DateTimePicker').maxDate(this.get('maxDate'));
      } else {
        domElement.data('DateTimePicker').maxDate(false);
      }
    }
  },

  actions: {
    toggleCalendar: function(){
      this.$('input').data("DateTimePicker").toggle();
    }
  }
});
