import Route from "@ember/routing/route";
import IndexController from "./controller";
import { inject as service } from '@ember/service';
import Store from "@ember-data/store";

export default class IndexRoute extends Route {
  @service store !: Store;

  beforeModel() {
    this.store.push({
      data: {
        type: "company",
        id: 1,
        attributes: {}
      }
    });

    this.store.push({
      data: {
        type: "contact",
        id: 2,
        attributes: {}
      }
    });
  }

  setupController(controller: IndexController) {
    controller.set("company", this.store.peekRecord("company", 1));
    controller.set("contact", this.store.peekRecord("contact", 2));
  }
}
