import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import { isArray } from '@ember/array';

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
