import Transform from "ember-data/transform";

function isNumber(value) {
  return value === value && value !== Infinity && value !== -Infinity;
}

export default Transform.extend({
  deserialize(serialized) {
    let transformed;

    if (serialized === "" || serialized === null || serialized === undefined) {
      return null;
    } else {
      transformed = Number(serialized);

      return isNumber(transformed) ? transformed : null;
    }
  },

  serialize(deserialized) {
    let transformed;

    if (
      deserialized === "" ||
      deserialized === null ||
      deserialized === undefined
    ) {
      return null;
    } else {
      transformed = Number(deserialized);

      return isNumber(transformed) ? transformed : null;
    }
  }
});
