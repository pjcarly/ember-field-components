import BaseInput, { Arguments } from "../BaseInput";

interface SearchArguments extends Arguments {
  value?: string;
}

export default class InputSearchComponent extends BaseInput<SearchArguments> {
  type = "search";
}
