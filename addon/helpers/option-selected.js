import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;
const { String } = Ember;
const { htmlSafe } = String;
const { isArray } = Array;

export default Helper.extend({
  compute([selectoption, selectedvalue]){
    let label = this.getLabel(selectoption);

    if(!isBlank(selectedvalue) && ((!isArray(selectedvalue) && selectoption.value === selectedvalue) || (isArray(selectedvalue) && selectedvalue.indexOf(selectoption.value) !== -1))){
      return htmlSafe('<option value="' + selectoption.value + '" selected="selected">' + label + '</option>');
    }

    return htmlSafe('<option value="' + selectoption.value + '">' + label + '</option>');
  },
  getLabel(selectoption){
    let label = selectoption.label;

    if (isBlank(label)) {
      label = selectoption.value;
    }

    return label;
  }
});
