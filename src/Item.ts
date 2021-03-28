import { Attribute } from "./Attributes";
import { Material } from "./Materials";
import { Rarity } from "./Rarities";
import { Slot } from "./Slots";
import { Type } from "./Types";

export default class Item {
   private _id: string;
   private _name: string;
   private _code: string;
   private _itemLevel: number;
   private _type: Type;
   private _material: Material;
   private _rarity: Rarity;
   private _defaultAttribute: Attribute;
   private _slot: Slot;
   private _attributes: Array<Attribute>;
   private _roll: number;


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

   public get type(): Type {
      return this._type;
   }

   public get material(): Material {
      return this._material;
   }

   public get rarity(): Rarity {
      return this._rarity;
   }

   public get defaultAttribute(): Attribute {
      return this._defaultAttribute;
   }

   public get slot(): Slot {
      return this._slot;
   }

   public get attributes(): Array<Attribute> {
      return this._attributes;
   }

   public get roll(): number {
      return this._roll;
   }


   public setId(id: string): Item {
      this._id = id;
      return this;
   }

   public setSlot(slot: Slot): Item {
      this._slot = slot;
      return this;
   }

   public setRarity(rarity: Rarity): Item {
      this._rarity = rarity;
      return this;
   }

   public setMaterial(Material: Material): Item {
      this._material = Material;
      return this;
   }

   public setItemLevel(itemLevel: number): Item {
      this._itemLevel = itemLevel;
      return this;
   }

   public setType(type: Type): Item {
      this._type = type;
      return this;
   }

   public setDefaultAttribute(stat: Attribute): Item {
      this._defaultAttribute = stat;
      return this;
   }

   public addAttribute(stat: Attribute, value?: number): Item {
      if (!this._attributes) {
         this._attributes = [];
      }
      if (value) {
         stat.value = value;
      }
      this._attributes.push(stat);
      return this;
   }

   public setAttributes(stats: Array<Attribute>): Item {
      this._attributes = stats;
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
}