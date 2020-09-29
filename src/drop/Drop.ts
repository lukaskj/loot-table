import Codeable from "../interfaces/Codeable"
import Item from "../Item"
import Random from "../rarity/utils/Random";
import * as uuid from 'uuid';
import { Rarity } from "../Rarities";
import { Slot } from "../Slots";
import { Material } from "../Materials";
import { Type } from "../Types";

export default class {
   private itemLevel: TypeMinMax = { min: 0, max: 100 };
   private items: Array<TypeChanceItem> = [];
   private rarities: Array<TypeChance> = [];
   private attributes: Array<TypeChance> = [];
   private materials: Array<TypeChance> = [];
   private slots: Array<TypeChance> = [];
   private types: Array<TypeChance> = [];


   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public setItemLevel(itemLevel: TypeMinMax): this {
      this.itemLevel = itemLevel;
      return this;
   }

   public addItem(item: TypeChanceItem): this {
      this.items.push(item);
      return this;
   }

   public addRarity(rarity: TypeChance): this {
      this.rarities.push(rarity);
      return this;
   }

   public addAttribute(attribute: TypeChance): this {
      this.attributes.push(attribute);
      return this;
   }

   public addMaterial(material: TypeChance): this {
      this.materials.push(material);
      return this;
   }

   public addSlot(slot: TypeChance): this {
      this.slots.push(slot);
      return this;
   }

   public addType(type: TypeChance): this {
      this.types.push(type);
      return this;
   }

   private _getPropertyByChance<T extends Codeable>(propList: Array<TypeChance>, certainDrop?: boolean): T {
      const _propList = propList.sort((a: any, b: any) => b.chance - a.chance);
      for (let i = 0; i < _propList.length; i++) {
         // if (i == _propList.length - 1) {
         //    return _propList[i].property;
         // }
         const dropChance = this.random.double() * 100;
         // console.log("dropChance", dropChance, _propList[i].chance);
         if (_propList[i].chance >= dropChance) {
            return _propList[i].property as T;
         }
      }
      return _propList[0].property as T;
   }

   public dropItem(): Item {
      const ID: string = uuid.v4();
      const item: Item = new Item();
      const level: number = this.random.range(this.itemLevel.min, this.itemLevel.max, true);

      item.setId(ID).setItemLevel(level);

      if (!!this.rarities.length) {
         const rarity: Rarity = this._getPropertyByChance<Rarity>(this.rarities);
         item.setRarity(rarity);
      }

      if (!!this.slots.length) {
         const slot: Slot = this._getPropertyByChance<Slot>(this.slots);
         item.setSlot(slot);
      }

      if (!!this.types.length) {
         const type: Type = this._getPropertyByChance<Type>(this.types);
         item.setType(type);
      }

      // if (!!this.materials.length) {
      //    const material = this._getPropertyByChance<Material>(this.materials);
      //    item.setMaterial(material);
      // }

      return item;
   }

}


export type TypeMinMax = {
   min: number,
   max: number,
}

export type TypeChance = {
   chance: number,
   property: Codeable,
   value?: TypeMinMax,
}

export type TypeChanceItem = {
   chance: number,
   item: Item,
   level: TypeMinMax
}