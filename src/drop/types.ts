import { Item } from "..";
import { AttributeInterface } from "../Attributes";
import { MaterialInterface } from "../Materials";
import { RarityInterface } from "../Rarities";
import { SlotInterface } from "../Slots";
import { TypeInterface } from "../Types";

export interface TypeRange {
  min: number,
  max: number,
}

export type TypeChance<T> = {
  chance: number,
  property: T,
  value?: TypeRange | number,
};

export type TypeChanceRarity = {
  chance: number,
  rarity: RarityInterface,
  value?: TypeRange | number,
};

export type TypeChanceAttribute = {
  chance: number,
  attribute: AttributeInterface,
  value?: TypeRange | number,
};

export type TypeChanceMaterial = {
  chance: number,
  material: MaterialInterface,
  value?: TypeRange | number,
};

export type TypeChanceSlot = {
  chance: number,
  slot: SlotInterface,
  value?: TypeRange | number,
};

export type TypeChanceType = {
  chance: number,
  type: TypeInterface,
  value?: TypeRange | number,
};

export type TypeChanceItem = {
  chance: number,
  item: Item,
  level?: TypeRange
};