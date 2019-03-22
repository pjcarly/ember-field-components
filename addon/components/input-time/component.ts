import BaseInputDate from '../BaseInputDate';

export default class InputTimeComponent extends BaseInputDate {
  type = 'time';
  format = 'HH:mm:ss';
}
