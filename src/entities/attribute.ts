import { NonFunctionProperties } from "../utils/non-function-properties";
import { Codeable } from "./abstract/codeable";

export class Attribute extends Codeable {
  public value?: number = 0;

  constructor(data: NonFunctionProperties<Attribute>) {
    super(data);
    this.value = data.value;
  }
}
