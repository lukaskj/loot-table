import Codeable from "../interfaces/Codeable"
import Item from "../Item"
import Random from "../rarity/utils/Random";
import * as uuid from 'uuid';
import { Rarity } from "../Rarities";
import { Slot } from "../Slots";
import { Material } from "../Materials";
import { Type } from "../Types";
import { Attribute } from "../Attributes";

export default class {
   private itemLevel: TypeMinMax = { min: 0, max: 100 };
   private items: Array<TypeChanceItem> = [];
   private rarities: Array<TypeChance<Rarity>> = [];
   private attributes: Array<TypeChance<Attribute>> = [];
   private materials: Array<TypeChance<Material>> = [];
   private slots: Array<TypeChance<Slot>> = [];
   private types: Array<TypeChance<Type>> = [];


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

   public addRarity(rarity: TypeChance<Rarity>): this {
      this.rarities.push(rarity);
      return this;
   }


   public addType(type: TypeChance<Type>): this {
      this.types.push(type);
      return this;
   }

   public addAttribute(attribute: TypeChance<Attribute>): this {
      this.attributes.push(attribute);
      return this;
   }

   public addMaterial(material: TypeChance<Material>): this {
      this.materials.push(material);
      return this;
   }

   public addSlot(slot: TypeChance<Slot>): this {
      this.slots.push(slot);
      return this;
   }


   private _getPropertyByChance<T extends Codeable>(propList: Array<TypeChance<T>>, certainDrop?: boolean): TypeChance<T> {
      const _propList = propList.sort((a: any, b: any) => b.chance - a.chance);
      for (let i = 0; i < _propList.length; i++) {
         // if (i == _propList.length - 1) {
         //    return _propList[i].property;
         // }
         const dropChance = this.random.double() * 100;
         // console.log("dropChance", dropChance, _propList[i].chance);
         if (_propList[i].chance >= dropChance) {
            return _propList[i];
         }
      }
      return _propList[0];
   }

   public dropItem(): Item {
      const ID: string = uuid.v4();
      const item: Item = new Item();
      const level: number = this.random.range(this.itemLevel.min, this.itemLevel.max, true);

      item.setId(ID).setItemLevel(level);

      if (!!this.rarities.length) {
         const rarity: Rarity = this._getPropertyByChance<Rarity>(this.rarities).property;
         item.setRarity(rarity);
      }

      if (!!this.slots.length) {
         const slot: Slot = this._getPropertyByChance<Slot>(this.slots).property;
         item.setSlot(slot);
      }

      if (!!this.types.length) {
         const type: TypeChance<Type> = this._getPropertyByChance<Type>(this.types);
         item.setType(type.property);
         const defaultAttr = item.getType().defaultAttribute;
         item.setDefaultAttribute({ ...defaultAttr, value: this.random.range(type.value?.min || 0, type.value?.max || item.getItemLevel()) });
      }

      const itemMaterials: Array<Material> = item.getType().materials;
      let mergedMaterials: Array<TypeChance<Material>> = [];
      const materialsNotInDroptable: Array<TypeChance<Material>> = [];
      // TODO randomize item materials
      for (let index = 0; index < itemMaterials.length; index++) {
         const itemMaterial = itemMaterials[index];
         const itemMaterialInDropMaterial = this.materials?.find(i => i.property.code === itemMaterial.code);
         if (!!itemMaterialInDropMaterial) {
            mergedMaterials.push(itemMaterialInDropMaterial);
         } else {
            materialsNotInDroptable.push({ chance: 100 / itemMaterials.length, property: itemMaterial });
         }
      }
      if (!mergedMaterials.length) {
         mergedMaterials = materialsNotInDroptable;
      }

      if (!!mergedMaterials.length) {
         const material: Material = this._getPropertyByChance<Material>(mergedMaterials).property;
         item.setMaterial(material);
      }

      return item;
   }

}


export type TypeMinMax = {
   min: number,
   max: number,
}

export type TypeChance<T> = {
   chance: number,
   property: T,
   value?: TypeMinMax,
}

export type TypeChanceItem = {
   chance: number,
   item: Item,
   level: TypeMinMax
}