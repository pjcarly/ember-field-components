import Component from "@ember/component";
import Model from "ember-data/model";
import { computed } from "@ember/object";
import { tagName } from "@ember-decorators/component";
import { get } from "@ember/object";

/**
 * This component displays the error messages for the provided field on the model
 */
@tagName("")
export default class FieldMessagesComponent extends Component {
  model!: Model;
  field!: string;

  @computed("model.errors.[]", "field")
  get errors() {
    const errors = get(this.model, "errors");
    return errors.errorsFor(this.field);
  }
}
