import ValidationModel from "@getflights/ember-attribute-validations/model/validation-model";
import { field } from "@getflights/ember-field-components/model/attribute";
import { belongsTo } from "@ember-data/model";
import CompanyModel from "./company";

export default class ContactModel extends ValidationModel {
  @field("string", { validation: { in: { values: ["MR", "MS"] } } })
  salutation!: string;

  @field("string", {
    validation: { required: true, range: { from: 2, to: 20 } },
  })
  firstName!: string;

  @field("string", { validation: { required: true } })
  lastName!: string;

  @field("email")
  email?: string;

  @field("phone")
  phone?: string;

  @field("number", {
    precision: 2,
    decimals: 1,
    validation: {
      wholenumber: true,
      max: 150,
      min: 0,
    },
  })
  age?: number;

  @field("date", {
    validation: {
      date: true,
      after: new Date("2000-01-01"),
      before() {
        return new Date();
      },
    },
  })
  birthdate?: Date;

  @field("date", {
    widget: "flatpickr",
  })
  signUpDate?: Date;

  @field("datetime", {
    widget: "flatpickr",
  })
  lastSignInDate?: Date;

  @belongsTo("company")
  company?: CompanyModel;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    contact: ContactModel;
  }
}
