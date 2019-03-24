import InputDateBootstrapComponent from "../input-date-bootstrap/component";
import { computed } from "@ember-decorators/object";
import { isBlank } from "@ember/utils";


export default class InputDatetimeBootstrapComponent extends InputDateBootstrapComponent {
  type = 'datetime-bootstrap';

  @computed('format', 'fieldInformation.timeFormat')
  get momentFormat() : string {
    if(isBlank(this.format)){
      return this.fieldInformation.timeFormat;
    } else {
      return this.format;
    }
  }
}
