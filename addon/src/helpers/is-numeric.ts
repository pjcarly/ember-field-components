import Helper from "@ember/component/helper";
// @ts-ignore
import { isNumeric } from "@getflights/ember-attribute-validations/utils";

export default class IsNumericClass extends Helper {
  compute([value]: [any]) {
    return isNumeric(value);
  }
}
