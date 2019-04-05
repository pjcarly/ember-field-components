import { Route } from "@ember/routing";
import Controller from "@ember/controller";

export default class RouteResetControllerRoute extends Route {
  resetController(controller: Controller, isExiting: boolean, transition: any) {
    super.resetController(controller, isExiting, transition);
    controller.model.rollback();
  }
}
