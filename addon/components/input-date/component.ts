import BaseInputDate, { DateArguments } from "../BaseInputDate";

export default class InputDateComponent extends BaseInputDate<DateArguments> {
  type = "date";
  format = "YYYY-MM-DD";
}
