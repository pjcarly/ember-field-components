import Component from "@glimmer/component";
import Model from "@ember-data/model";

interface Arguments {
  /**
   * The Model you want to display the error messages from
   */
  model: Model;

  /**
   * If this flag is true, all the errors for every field + the errors not specific to a certain field will be displayed.
   */
  displayAll?: boolean;
}

/**
 * This component displays either the errors not related to a specific field on a provided model, or all the errors on the model, depending on the flag displayAll (default=false)
 */
export default class ModelMessagesComponent extends Component<Arguments> {
  get errors() {
    const errors = this.args.model.errors;
    return this.args.displayAll
      ? errors
      : errors
          // @ts-ignore
          .errorsFor("base");
  }
}
