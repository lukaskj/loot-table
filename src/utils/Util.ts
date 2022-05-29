import { ItemDropChance, RandomItemDropChance } from "../interfaces/json/DropTableJsonInterface";
import { isNullOrUndefined } from "./IsNullOrUndefined";

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isDropItemfromJson(drop: RandomItemDropChance | ItemDropChance): drop is ItemDropChance {
  return !isNullOrUndefined((drop as ItemDropChance).item);
}

export { isNumber, isDropItemfromJson };
