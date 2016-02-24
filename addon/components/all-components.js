import Ember from 'ember';

export default Ember.Component.extend({
  textValue: 'this is text',
  textAreaValue: 'this is text in a textarea',
  booleanValue: true,
  emailValue: 'mickey@mouse.be',
  phoneValue: '+32123456789',
  urlValue: 'www.google.com',

  selectOptions: [{
    'value': 'nl',
    'label': 'Dutch'
  }, {
    'value': 'fr',
    'label': 'French'
  }, {
    'value': 'en',
    'label': 'English'
  }],

  columns: [{
    'value': 'value',
    'label': 'Value'
  }, {
    'value': 'label',
    'label': 'Label'
  }],

  actions: {
    valueChanged: function(value){
      console.log(value);
    },
    booleanValueChanged: function(value){
      console.log(value);
      this.set('booleanValue', value);
    },
    textValueChanged: function(value){
      console.log(value);
      this.set('textValue', value);
    },
    textAreaValueChanged: function(value){
      console.log(value);
      this.set('textAreaValue', value);
    },
    emailValueChanged: function(value){
      console.log(value);
      this.set('emailValue', value);
    },
    phoneValueChanged: function(value){
      console.log(value);
      this.set('phoneValue', value);
    },
    urlValueChanged: function(value) {
      console.log(value);
      this.set('urlValue', value);
    }
  }
});
