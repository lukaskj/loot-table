import { NonFunctionProperties } from "../utils/non-function-properties";
import { Codeable } from "./abstract/codeable";

export class Rarity extends Codeable {
  multiplier: number;
  attributeCount: number;

  constructor(data: NonFunctionProperties<Rarity>) {
    super(data);
    this.multiplier = data.multiplier;
    this.attributeCount = data.attributeCount;
  }
}
