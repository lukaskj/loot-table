import { randomUUID } from "crypto";

import { IRange } from "../interface/range-interface";
import { isNumber } from "../utils/is_number";
import { NonFunctionProperties } from "../utils/non-function-properties";
import { Random } from "../utils/random";
import { Codeable } from "./abstract/codeable";
import { Item } from "./item";
import { Rarity } from "./rarity";
import { Type } from "./type";
import { IAttribute } from "./types";

const RandomKey = Symbol("random");

export class RandomItem extends Codeable {
  public name: string;
  public itemLevel: IRange = { min: 0, max: 100 };
  public qualities: IRange = { min: 0, max: 100 };
  public rarities: NonFunctionProperties<Rarity>[] = [];
  public types: NonFunctionProperties<Type>[] = [];
  public attributes: IAttribute[] = [];
  private [RandomKey]: Random;

  constructor(data: NonFunctionProperties<RandomItem>) {
    super(data);
    this.name = data.name;
    this.itemLevel = data.itemLevel;
    this.qualities = data.qualities;
    this.rarities = data.rarities;
    this.types = data.types;
    this.attributes = data.attributes;
    this.seed = data.seed ?? randomUUID();
    this[RandomKey] = new Random(this.seed);
  }

  public generateItem(): Item {
    const random = this[RandomKey];
    const level = random.range(this.itemLevel.min, this.itemLevel.max, true);
    const quality: number = random.range(this.qualities.min, this.qualities.max, true);
    const rarity = this.rollProperty(this.rarities);
    const type = this.rollProperty(this.types);

    const maxAttributeCount = rarity.attributeCount;
    const attributesToAdd: IAttribute[] = [];

    for (let i = 0; i < maxAttributeCount; i++) {
      if (!attributesToAdd.length) {
        break;
      }

      const attribute = this.rollProperty(this.attributes, i !== 0);
      let value: number;
      if (isNumber(attribute.value)) {
        value = attribute.value;
      } else {
        value = random.range(attribute?.value?.min || 0, attribute?.value?.max || level);
      }
      attribute.value = value;
      attributesToAdd.push({ ...attribute });
      const indx = this.attributes.indexOf(attribute);
      if (indx >= 0) {
        this.attributes.splice(indx, 1);
      }
    }

    const item = new Item({
      id: randomUUID(),
      name: this.name,
      chance: this.chance,
      seed: this.seed,
      code: null,
      level,
      quality,
      rarity,
      type,
      attributes: attributesToAdd,
    });

    return item;
  }

  private rollProperty<T extends Codeable>(properties: T[], skipSort?: boolean): T {
    const random = this[RandomKey];
    const _propList = skipSort ? properties : properties.sort((a, b) => (b.chance ?? 0) - (a.chance ?? 0));
    for (let i = 0; i < _propList.length; i++) {
      const roll = random.double() * 100;
      if ((_propList[i].chance ?? 0) >= roll) {
        _propList[i].roll = roll;
        _propList[i].seed = this.seed;
        return _propList[i];
      }
    }
    return properties[0] ?? null;
  }
}