import { randomUUID } from "crypto";
import { calculateAttribute } from "../utils/calculate-attributes";
import { Codeable } from "./abstract/codeable";
import { Attribute } from "./attribute";
import { Rarity } from "./rarity";
import { Type } from "./type";
import { IAttribute, IItem } from "./types";

export class Item extends Codeable {
  public id: string | null;
  public level: number;
  public quality: number = 100;
  public rarity: Rarity;
  public type: Type;
  public attributes: IAttribute[] = [];
  private baseAttributes: Attribute[] = [];

  constructor(data: IItem) {
    super(data);
    this.id = data.id ?? randomUUID();
    this.level = data.level;
    this.quality = data.quality;
    this.rarity = data.rarity;
    this.type = data.type;
    this.setAttributes(data.attributes ?? []);
  }

  public addAttribute(attribute: IAttribute, _value?: number): Item {
    // The base attributes are the raw values passed.
    // The attributes itself are calculated based on item quality (percentage) and the rarity multiplier
    const calculatedAttribute = calculateAttribute(attribute, this.quality, this.rarity);

    this.attributes.push(calculatedAttribute.attribute);
    this.baseAttributes.push(calculatedAttribute.baseAttribute);
    return this;
  }

  public setAttributes(stats: IAttribute[]): Item {
    this.attributes.splice(0, this.attributes.length);
    this.baseAttributes.splice(0, this.baseAttributes.length);
    stats.forEach((att) => this.addAttribute(att));
    return this;
  }

  public static fromJson(json: IItem): Item {
    const item = new Item(json);
    item.setAttributes(json.attributes);
    return item;
  }
}
