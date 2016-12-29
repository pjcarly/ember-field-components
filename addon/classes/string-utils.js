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

function pad(len, width, z) {
  let s = z;
  let w = width - len;

  while (--w) {
    s += z;
  }

  return s;
}

export function padStart(n, width, z = '0') {
  let nstr = String(n);
  let len  = nstr.length;

  if (len >= width) {
    return nstr;
  }

  return pad(len, width, z) + nstr;
}

export default padStart;

export function padEnd(n, width, z = '0') {
  let nstr = String(n);
  let len  = nstr.length;

  if (len >= width) {
    return nstr;
  }

  return nstr + pad(len, width, z);
}
