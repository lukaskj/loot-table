import { IRollable } from "../../interface/rollable";
import { generateCode } from "../../utils/item-code";
import { NonFunctionProperties } from "../../utils/non-function-properties";

export class Codeable implements IRollable {
  public code: string;
  public name: string;
  public seed?: string;
  public roll?: number = -1;
  public chance?: number = -1;

  constructor(data: NonFunctionProperties<Codeable>) {
    this.name = data.name;
    this.seed = data.seed;
    this.roll = data.roll;
    this.chance = data.chance;
    this.code = generateCode(data.code, data.name);
  }

  public withChance(chance: number): this {
    this.chance = chance;
    return this;
  }
}
