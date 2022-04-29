import Helper from "@ember/component/helper";
import { isBlank } from "@ember/utils";
import { getOwner } from "@ember/application";
import ApplicationInstance from "@ember/application/instance";

export default class RouteExistsHelper extends Helper {
  compute([route]: [string]): boolean {
    if (isBlank(route)) {
      return false;
    }

    return (<ApplicationInstance>getOwner(this)).lookup(`route:${route}`) ? true : false;
  }
}
