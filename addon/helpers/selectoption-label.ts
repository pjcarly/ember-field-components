import OptionSelectedHelper from "./option-selected";

export default class SelectOptionHelper extends OptionSelectedHelper {
  compute([selectoption]){
    return this.getLabel(selectoption);
  }
}
