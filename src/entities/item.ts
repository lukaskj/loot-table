import { NonFunctionProperties } from "../utils/non-function-properties";
import { Codeable } from "./abstract/codeable";
import { Attribute } from "./attribute";
import { Rarity } from "./rarity";
import { Type } from "./type";

export class Item extends Codeable {
  public id: string;
  public itemLevel: number;
  public quality: number = 100;
  public rarity: Rarity;
  public type: Type;
  public attributes: Attribute[] = [];
  private baseAttributes: Attribute[] = [];

  constructor(data: NonFunctionProperties<Item>) {
    super(data);
    this.id = data.id;
    this.itemLevel = data.itemLevel;
    this.quality = data.quality;
    this.rarity = data.rarity;
    this.type = data.type;
    this.setAttributes(data.attributes ?? []);
  }

  public addAttribute(attribute: NonFunctionProperties<Attribute>, value?: number): Item {
    const baseAttribute: Attribute = new Attribute(attribute);
    const newAttribute: Attribute = new Attribute(attribute);
    if (!this.attributes) {
      this.attributes = [];
    }

    if (!this.baseAttributes) {
      this.baseAttributes = [];
    }

    if (value) {
      newAttribute.value = (value * this.quality) / 100;
      baseAttribute.value = value;
    } else if (newAttribute.value) {
      baseAttribute.value = newAttribute.value;
      newAttribute.value = (newAttribute.value * this.quality) / 100;
    }

    this.attributes.push(newAttribute);
    this.baseAttributes.push(baseAttribute);
    return this;
  }

  public setAttributes(stats: Array<NonFunctionProperties<Attribute>>): Item {
    this.attributes.splice(0, this.attributes.length);
    this.baseAttributes.splice(0, this.baseAttributes.length);
    stats.forEach((att) => this.addAttribute(att));
    return this;
  }

  public static fromJson(json: NonFunctionProperties<Item>): Item {
    const item = new Item(json);
    item.setAttributes(json.attributes);
    return item;
  }
}
