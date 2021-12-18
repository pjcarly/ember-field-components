import ValidationModel from "@getflights/ember-attribute-validations/model/validation-model";
import { attr, belongsTo } from "@ember-data/model";
import CompanyModel from "./company";

export default class ContactModel extends ValidationModel {
  // @ts-ignore
  @attr("string", { validation: { in: ["MR", "MS"] } })
  salutation!: string;

  // @ts-ignore
  @attr("string", {
    validation: { required: true, range: { from: 2, to: 20 } },
  })
  firstName!: string;

  // @ts-ignore
  @attr("string", { validation: { required: true } })
  lastName!: string;

  // @ts-ignore
  @attr("email")
  email?: string;

  // @ts-ignore
  @attr("phone")
  phone?: string;

  // @ts-ignore
  @attr("number", {
    precision: 2,
    decimals: 1,
    validation: {
      wholenumber: true,
      max: 150,
      min: 0,
    },
  })
  age?: number;

  // @ts-ignore
  @attr("date", {
    validation: {
      date: true,
      after: new Date("2000-01-01"),
      before() {
        return new Date();
      },
    },
  })
  birthdate?: Date;

  // @ts-ignore
  @attr("date", {
    widget: "flatpickr",
  })
  signUpDate?: Date;

  // @ts-ignore
  @attr("datetime", {
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
