import InputSelectComponent, {
  SelectArguments,
} from "../input-select/component";
import { guidFor } from "@ember/object/internals";

export default class InputMultiSelectComponent extends InputSelectComponent<
  SelectArguments
> {
  get inputIdComputed(): string {
    return this.args.inputId ?? `${guidFor(this)}-queue`;
  }
}
