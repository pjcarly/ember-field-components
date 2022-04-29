import { isNone as none } from "@ember/utils";
import Transform from "@ember-data/serializer/transform";

export default Transform.extend({
  deserialize(serialized: any) {
    return none(serialized) ? null : String(serialized);
  },
  serialize(deserialized: any) {
    return none(deserialized) ? null : String(deserialized);
  },
});
