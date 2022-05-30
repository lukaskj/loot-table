import { v4 } from "uuid";

import { isNullOrUndefined } from "./is-null-or-undefined";
import { toDashCase } from "./to-dash-case";

export function generateCode(code: string | null, name: string | null): string {
  let newCode = "";
  if (!isNullOrUndefined(code)) {
    newCode = code;
  } else {
    if (!isNullOrUndefined(name)) {
      newCode = toDashCase(name);
    } else {
      newCode = v4();
    }
  }
  return newCode;
}
