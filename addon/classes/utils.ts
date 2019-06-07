import { isBlank } from '@ember/utils';

export function round(value: any, exp: number) : number {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

export function left(value: string, count: number) : string {
  return value.substring(0, count);
}

export function replaceAll(str: string, find: string, replace: string) : string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function removeSpecialChars(str: string) : string | undefined {
  if(!isBlank(str)) {
    return str.replace(/[^\w\s]/gi, '');
  }

  return;
}

function escapeRegExp(str: string) : string {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}

export function wildcardMatch(str: string, rule : string) : boolean {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

function pad(len: number, width: number, z: string) : string {
  let s = z;
  let w = width - len;

  while (--w) {
    s += z;
  }

  return s;
}

export function padStart(n: string, width: number, z = '0') : string {
  let nstr = String(n);
  let len  = nstr.length;

  if (len >= width) {
    return nstr;
  }

  return pad(len, width, z) + nstr;
}

export default padStart;

export function padEnd(n: string, width: number, z = '0') : string {
  let nstr = String(n);
  let len  = nstr.length;

  if (len >= width) {
    return nstr;
  }

  return nstr + pad(len, width, z);
}
