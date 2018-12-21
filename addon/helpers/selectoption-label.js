import OptionSelected from 'ember-field-components/helpers/option-selected';

export default OptionSelected.extend({
  compute([selectoption]){
    return this.getLabel(selectoption);
  }
});
