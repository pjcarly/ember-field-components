import Helper from "@ember/component/helper";
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { isBlank } from "@ember/utils";

export default class SelectOptionHelper extends Helper {
  compute([selectoption]: [SelectOption]) {
    let label = selectoption.label;

    if (isBlank(label)) {
      label = selectoption.value;
    }

    return label;
  }
}
