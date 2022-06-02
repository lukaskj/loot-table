import { IRange } from "../interface/range-interface";
import { Codeable } from "./abstract/codeable";
import { IAttribute } from "./types";

export class Attribute extends Codeable {
  public value?: number | IRange = 0;

  constructor(data: IAttribute) {
    super(data);
    this.value = data.value;
  }

  public withValue(value: number): Attribute {
    return new Attribute({ ...this, value });
  }

  public withRange(value: IRange): Attribute {
    return new Attribute({ ...this, value });
  }
}
