import Helper from "@ember/component/helper";
import { isString } from "@getflights/ember-attribute-validations/utils";

export default class IsStringHelper extends Helper {
  compute([value]: [any]) {
    return isString(value);
  }
}
