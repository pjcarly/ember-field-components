import BaseInput, { Arguments } from "../../BaseInput";

interface EmailArguments extends Arguments {
  value?: string;
}

export default class InputEmailComponent extends BaseInput<EmailArguments> {
  type = "email";
}
