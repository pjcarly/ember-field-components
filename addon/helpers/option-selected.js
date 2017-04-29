import Ember from 'ember';

const { Helper, isBlank, String } = Ember;
const { htmlSafe } = String;

export default Helper.extend({
  compute([selectoption, selectedvalue]){
    let label = this.getLabel(selectoption);

    if (!isBlank(selectedvalue) && selectoption.value === selectedvalue) {
      return htmlSafe('<option value="' + selectoption.value + '" selected="selected">' + label + '</option>');
    } else {
      return htmlSafe('<option value="' + selectoption.value + '">' + label + '</option>');
    }
  },
  getLabel(selectoption){
    let label = selectoption.label;

    if (isBlank(label)) {
      label = selectoption.value;
    }

    return label;
  }
});
