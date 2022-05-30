import { NonFunctionProperties } from "../utils/non-function-properties";
import { Codeable } from "./abstract/codeable";

export class Slot extends Codeable {
  constructor(data: NonFunctionProperties<Slot>) {
    super(data);
  }
}
