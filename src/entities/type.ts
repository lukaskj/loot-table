import { NonFunctionProperties } from "../utils/non-function-properties";
import { Codeable } from "./abstract/codeable";
import { Slot } from "./slot";

export class Type extends Codeable {
  public slot: Slot;
  constructor(data: NonFunctionProperties<Type>) {
    super(data);
    this.slot = data.slot;
  }
}
