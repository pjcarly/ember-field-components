import InputSelectComponent from "../input-select/component";
import { computed } from "@ember-decorators/object";
import { isBlank } from "@ember/utils";

export default class InputButtonGroupComponent extends InputSelectComponent {
  @computed('class')
  get classComputed() : string {
    return isBlank(this.class) ? 'btn-group' : this.class;
  }

  @computed('options.buttonClass')
  get buttonClassComputed() : string {
    return this.options && this.options.buttonClass ? this.options.buttonClass : 'btn btn-default';
  }
}
