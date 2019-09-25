import { isNone as none } from "@ember/utils";
import Transform from "ember-data/transform";

export default Transform.extend({
  deserialize(serialized) {
    return none(serialized) ? null : String(serialized);
  },
  serialize(deserialized) {
    return none(deserialized) ? null : String(deserialized);
  }
});
