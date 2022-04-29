import BaseInputDate, { DateArguments } from "../BaseInputDate";

export default class InputDateComponent<
  T extends DateArguments
> extends BaseInputDate<T> {
  type = "date";
  format = "YYYY-MM-DD";
}
