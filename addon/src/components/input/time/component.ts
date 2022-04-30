import BaseInputDate, { DateArguments } from "../../BaseInputDate";

export default class InputTimeComponent extends BaseInputDate<DateArguments> {
  type = "time";
  format = "HH:mm:ss";
}
