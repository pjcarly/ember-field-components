import Ember from 'ember';

export default Ember.Helper.helper(function([selectoption, selectedvalue]) {
  var label = selectoption.label;

  if (Ember.isBlank(label)) {
    label = selectoption.value;
  }

  if (!Ember.isBlank(selectedvalue) && selectoption.value === selectedvalue) {
    return Ember.String.htmlSafe('<option value="' + selectoption.value + '" selected="selected">' + label + '</option>');
  } else {
    return Ember.String.htmlSafe('<option value="' + selectoption.value + '">' + label + '</option>');
  }
});