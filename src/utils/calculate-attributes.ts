import { Rarity } from "../entities/rarity";
import { Attribute } from "../entities/attribute";
import { NonFunctionProperties } from "./non-function-properties";
import { IAttribute } from "../entities/types";
import { isNumber } from "./is_number";

type AttributeResult = {
  baseAttribute: Attribute;
  attribute: Attribute;
};

type AttributesResult = {
  baseAttributes: Attribute[];
  attributes: Attribute[];
};

export function calculateAttribute(
  _attribute: IAttribute,
  itemQuality: number,
  rarity: NonFunctionProperties<Rarity>,
): AttributeResult {
  const baseAttribute: Attribute = new Attribute(_attribute);
  const attribute: Attribute = new Attribute(_attribute);
  const value = _attribute.value ?? 0;
  const qualityPercentage = itemQuality / 100;
  const rarityMultiplier = rarity.multiplier;
  const _value: number = isNumber(value) ? value : value.min;

  const newValue = _value * qualityPercentage * rarityMultiplier;

  attribute.value = newValue;

  return {
    attribute,
    baseAttribute,
  };
}

export function calculateAttributes(
  attributes: IAttribute[],
  itemQuality: number,
  rarity: NonFunctionProperties<Rarity>,
): AttributesResult {
  const baseAttributes: Attribute[] = [];
  const newAttributes: Attribute[] = [];
  for (const attribute of attributes) {
    const calculatedAttribute = calculateAttribute(attribute, itemQuality, rarity);

    baseAttributes.push(calculatedAttribute.baseAttribute);
    newAttributes.push(calculatedAttribute.attribute);
  }

  return {
    attributes: newAttributes,
    baseAttributes,
  };
}
