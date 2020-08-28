import Model from "ember-data/model";
import { validationModel } from "@getflights/ember-attribute-validations/decorators/validation-model";
import { field } from "@getflights/ember-field-components/model/attribute";
import { belongsTo } from "ember-data/relationships";
import CompanyModel from "./company";

@validationModel
export default class ContactModel extends Model {
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
