import Helper from "@ember/component/helper";
import moment from "moment";
import { isBlank } from "@ember/utils";

export default class MomentDateBeforeTodayHelper extends Helper {
  compute([value]: [Date | null]) {
    if (isBlank(value)) {
      return false;
    }

    const today = moment();
    //@ts-ignore
    return moment(value).isBefore(today);
  }
}
