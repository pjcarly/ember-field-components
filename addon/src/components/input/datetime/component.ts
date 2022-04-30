import BaseInputDate, { DateArguments } from "../../BaseInputDate";

export default class InputDatetimeComponent extends BaseInputDate<
  DateArguments
> {
  type = "datetime";
  format = "YYYY-MM-DDTHH:mm:ss";
}
