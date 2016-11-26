export function left(value, count) {
  return value.substring(0, count);
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function wildcardMatch(str, rule) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}
