import Transform from "@ember-data/serializer/transform";

export default Transform.extend({
  deserialize(serialized: any) {
    let type = typeof serialized;

    if (type === "string") {
      let offset = serialized.indexOf("+");

      if (offset !== -1 && serialized.length - 5 === offset) {
        offset += 3;
        return new Date(
          serialized.slice(0, offset) + ":" + serialized.slice(offset)
        );
      }
      return new Date(serialized);
    } else if (type === "number") {
      return new Date(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  },

  serialize(date: any) {
    if (date instanceof Date) {
      return date.toISOString();
    } else {
      return null;
    }
  },
});
