import Component from "@ember/component";
import Model from "@ember-data/model";
import { computed } from "@ember/object";
import { tagName } from "@ember-decorators/component";

/**
 * This component displays either the errors not related to a specific field on a provided model, or all the errors on the model, depending on the flag displayAll (default=false)
 */
@tagName("")
export default class ModelMessagesComponent extends Component {
  /**
   * The Model you want to display the error messages from
   */
  model!: Model;

  /**
   * If this flag is true, all the errors for every field + the errors not specific to a certain field will be displayed.
   */
  displayAll: boolean = false;

  @computed("model.errors.[]", "displayAll")
  get errors() {
    const errors = this.model.get("errors");
    return this.displayAll ? errors : errors.errorsFor("base");
  }
}
