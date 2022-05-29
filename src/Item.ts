import { AttributeInterface } from "./Attributes";
import { ItemJsonInterface } from "./interfaces/json/ItemJsonInterface";
import { MaterialInterface } from "./Materials";
import { RarityInterface } from "./Rarities";
import { SlotInterface } from "./Slots";
import { TypeInterface } from "./Types";

export default class Item {
  private _id!: string;
  private _name!: string;
  private _code!: string;
  private _itemLevel!: number;
  private _quality: number = 100;
  private _type!: TypeInterface;
  private _material!: MaterialInterface;
  private _rarity!: RarityInterface;
  private _slot!: SlotInterface;
  private _attributes: Array<AttributeInterface> = [];
  private _baseAttributes: Array<AttributeInterface> = [];
  private _roll!: number;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get code(): string {
    return this._code;
  }

  public get itemLevel(): number {
    return this._itemLevel;
  }

  public get quality(): number {
    return this._quality;
  }

  public get type(): TypeInterface {
    return this._type;
  }

  public get material(): MaterialInterface {
    return this._material;
  }

  public get rarity(): RarityInterface {
    return this._rarity;
  }

  public get slot(): SlotInterface {
    return this._slot;
  }

  public get attributes(): Array<AttributeInterface> {
    return this._attributes;
  }

  public get baseAttributes(): Array<AttributeInterface> {
    return this._baseAttributes;
  }

  public get roll(): number {
    return this._roll;
  }

  public setId(id: string): Item {
    this._id = id;
    return this;
  }

  public setSlot(slot: SlotInterface): Item {
    this._slot = slot;
    return this;
  }

  public setRarity(rarity: RarityInterface): Item {
    this._rarity = rarity;
    return this;
  }

  public setMaterial(Material: MaterialInterface): Item {
    this._material = Material;
    return this;
  }

  public setItemLevel(itemLevel: number): Item {
    this._itemLevel = itemLevel;
    return this;
  }

  public setQuality(quality: number): Item {
    this._quality = quality;
    return this;
  }

  public setType(type: TypeInterface): Item {
    this._type = type;
    return this;
  }

  public addAttribute(stat: AttributeInterface, value?: number): Item {
    const baseAttribute: AttributeInterface = Object.assign({}, stat);
    if (!this._attributes) {
      this._attributes = [];
    }

    if (!this._baseAttributes) {
      this._baseAttributes = [];
    }

    if (value) {
      stat.value = (value * this.quality) / 100;
      baseAttribute.value = value;
    } else if (stat.value) {
      baseAttribute.value = stat.value;
      stat.value = (stat.value * this.quality) / 100;
    }

    this.attributes.push(stat);
    this.baseAttributes.push(baseAttribute);
    return this;
  }

  public setAttributes(stats: Array<AttributeInterface>): Item {
    this._attributes.splice(0, this._attributes.length);
    this._baseAttributes.splice(0, this._baseAttributes.length);
    stats.forEach((att) => this.addAttribute(att));
    return this;
  }

  public setName(name: string): Item {
    this._name = name;
    return this;
  }

  // Interface methods
  public getName(): string {
    return this._name;
  }

  public getCode(): string {
    return this._code;
  }

  public setRoll(roll: number): Item {
    this._roll = roll;
    return this;
  }

  public getRoll(): number {
    return this._roll;
  }

  public toJson(): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const copy: any = Object.assign({}, this);
    Object.keys(copy)
      .filter((k) => k[0] === "_" && k != "_roll")
      .forEach((k) => {
        copy[k.replace("_", "")] = copy[k];
        delete copy[k];
      });
    return copy;
  }

  public static fromJson(json: ItemJsonInterface): Item {
    const item = new Item();
    item
      .setId(json.id)
      .setName(json.name)
      .setQuality(json.quality)
      .setItemLevel(json.itemLevel)
      .setAttributes(json.attributes)
      .setRarity(json.rarity)
      .setMaterial(json.material)
      .setSlot(json.slot)
      .setType(json.type);
    return item;
  }
}
