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


   public setId(id: string): Item {
      this._id = id;
      return this;
   }

   public getId(): string {
      return this._id;
   }

   public setSlot(slot: Slot): Item {
      this._slot = slot;
      return this;
   }

   public getSlot(): Slot {
      return this._slot;
   }

   public setRarity(rarity: Rarity): Item {
      this._rarity = rarity;
      return this;
   }

   public getRarity(): Rarity {
      return this._rarity;
   }

   public setMaterial(Material: Material): Item {
      this._material = Material;
      return this;
   }

   public getMaterial(): Material {
      return this._material;
   }

   public setItemLevel(itemLevel: number): Item {
      this._itemLevel = itemLevel;
      return this;
   }

   public getItemLevel(): number {
      return this._itemLevel;
   }

   public setType(type: Type): Item {
      this._type = type;
      return this;
   }

   public getType(): Type {
      return this._type;
   }

   public setDefaultAttribute(stat: Attribute) {
      this._defaultAttribute = stat;
      return this;
   }

   public getDefaultAttribute(): Attribute {
      return this._defaultAttribute;
   }

   public addAttribute(stat: Attribute): Item {
      if (!this._attributes) {
         this._attributes = [];
      }
      this._attributes.push(stat);
      return this;
   }

   public setAttributes(stats: Array<Attribute>): Item {
      this._attributes = stats;
      return this;
   }

   public getAttributes(): Array<Attribute> {
      return this._attributes || [];
   }

   public toJson(): any {
      return {
         id: this.getId(),
         code: this.getCode(),
         name: this.getName(),
         type: this.getType(),
         level: this.getItemLevel(),
         rarity: this.getRarity(),
         material: this.getMaterial(),
         slot: this.getSlot(),
         attribute: this.getDefaultAttribute(),
         attributes: this.getAttributes(),
      }
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
}