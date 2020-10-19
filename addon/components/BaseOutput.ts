import Component from "@glimmer/component";

export interface Arguments {
  /**
   * The Value of the input component
   */
  value?: any;

  /**
   * The custom class you want to give to the component
   */
  class?: string;

  /**
   * Some output components display helper buttons (like mailto for email) you can hide those buttons by settings this bool
   */
  showButton?: boolean;

  /**
   * Any custom options for the output component
   */
  options?: any;

  /**
   * A possible prefix
   */
  prefix?: string;

  /**
   * A possible suffix
   */
  suffix?: string;
}

export default abstract class BaseOutput<T extends Arguments> extends Component<
  T
> {
  /**
   * The type of Input Component. This will be added to the classes later
   */
  abstract type: string;
  protected showButton: boolean = true;

  constructor(owner: any, args: T) {
    super(owner, args);
    if (this.args.showButton === false) {
      this.showButton = false;
    }
  }

  get computedClass(): string {
    const classes = [];
    classes.push("output");
    classes.push(this.type);

    if (this.args.class) {
      classes.push(this.args.class);
    }

    return classes.join(" ");
  }
}
