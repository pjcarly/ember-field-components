import attr from "ember-data/attr";
// @ts-ignore
import { fragment } from "ember-data-model-fragments/attributes";
import { isNumeric } from "ember-attribute-validations/utils";
// @ts-ignore
import { lookup } from "ember-dependency-lookup";
import { assert } from "@ember/debug";
import { assign } from "@ember/polyfills";
import { isBlank, isEmpty } from "@ember/utils";

export function setType(type: string, options: any) {
  let defaultOptions: any = {};
  let defaultValidations: any = {};

  // Depending on the type, lets set default values
  switch (type) {
    case "number":
    case "price":
    case "percent": {
      let precision!: number, decimals!: number;

      if (!isBlank(options)) {
        if (options.hasOwnProperty("precision")) {
          precision = parseInt(options.precision);
        }
        if (options.hasOwnProperty("decimals")) {
          decimals = parseInt(options.decimals);
        }
      }

      assert("Decimals cannot be larger than precision", precision > decimals);
      assert("No number precision defined", !isEmpty(precision));
      assert("No number decimals defined", !isEmpty(decimals));
      assert("Number precision not numeric", isNumeric(precision));
      assert("Number decimals not numeric", isNumeric(decimals));

      defaultValidations = {
        number: true,
        precision: precision,
        decimals: decimals
      };

      if (decimals === 0) {
        defaultValidations.wholenumber = true;
        delete defaultValidations.decimals;
      }
      break;
    }
    case "currency": {
      const fieldInformation = lookup("service:field-information");

      defaultOptions["defaultValue"] = fieldInformation.get("defaultCurrency");
      break;
    }
    case "email":
      defaultValidations = {
        email: true,
        max: 255
      };
      break;
    case "string":
      defaultValidations = {
        max: 255
      };
      break;
    case "link":
      defaultValidations = {
        url: true
      };
      break;
    case "address":
      options = isBlank(options) ? {} : options;
      options.validation = options.hasOwnProperty("validation")
        ? options.validation
        : {};
      options.validation.validAddress = true;
      return fragment("address", options); // TODO fix dependency with ember-mist-components
  }

  // Now we have our default validations and or options
  defaultOptions = assign(defaultOptions, options);
  if (!isBlank(defaultValidations)) {
    if (!isBlank(options) && options.hasOwnProperty("validation")) {
      defaultOptions.validation = assign(
        options.validation,
        defaultValidations
      );
    } else {
      defaultOptions.validation = defaultValidations;
    }
  }

  // And return the DS attribute with the options
  // @ts-ignore
  return attr(type, defaultOptions);
}
