import { v4 } from "uuid";
import { IRollable } from "../../interface/rollable";
import { isNullOrUndefined } from "../../utils/is-null-or-undefined";
import { NonFunctionProperties } from "../../utils/non-function-properties";
import { toDashCase } from "../../utils/to-dash-case";

export class Codeable implements IRollable {
  public code: string;
  public name: string;
  roll?: number;
  chance?: number;

  constructor(data: NonFunctionProperties<Codeable>) {
    this.name = data.name;
    this.code = this.generateCode(data.code);
  }

  private generateCode(code: string | null): string {
    let newCode = "";
    if (!isNullOrUndefined(code)) {
      newCode = code;
    } else {
      if (!isNullOrUndefined(this.name)) {
        newCode = toDashCase(this.name);
      } else {
        newCode = v4();
      }
    }
    return newCode;
  }
}
