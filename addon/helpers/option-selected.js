import Ember from 'ember';

export default Ember.Helper.extend({
  compute([selectoption, selectedvalue]){
    let label = this.getLabel(selectoption);

    if (!Ember.isBlank(selectedvalue) && selectoption.value === selectedvalue) {
      return Ember.String.htmlSafe('<option value="' + selectoption.value + '" selected="selected">' + label + '</option>');
    } else {
      return Ember.String.htmlSafe('<option value="' + selectoption.value + '">' + label + '</option>');
    }
  },
  getLabel(selectoption){
    let label = selectoption.label;

    if (Ember.isBlank(label)) {
      label = selectoption.value;
    }

    return label;
  }
});
