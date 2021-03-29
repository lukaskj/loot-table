import Codeable from "../interfaces/Codeable";
import Item from "../Item";
import Random from "../utils/Random";
import * as uuid from "uuid";
import { Rarity } from "../Rarities";
import { Slot } from "../Slots";
import { Material } from "../Materials";
import { Type } from "../Types";
import { Attribute } from "../Attributes";
import Rollable from "../interfaces/Rollable";

export default class RandomItem {
   private itemLevel: TypeMinMax = { min: 0, max: 100 };
   private items: Array<TypeChanceItem> = [];
   private rarities: Array<TypeChance<Rarity>> = [];
   private attributes: Array<TypeChance<Attribute>> = [];
   private materials: Array<TypeChance<Material>> = [];
   private slots: Array<TypeChance<Slot>> = [];
   private types: Array<TypeChance<Type>> = [];
   private _name: string;


   public get name(): string {
      return this._name;
   }

   public setName(name: string): RandomItem {
      this._name = name;
      return this;
   }


   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public setItemLevel(itemLevel: TypeMinMax): this {
      this.itemLevel = itemLevel;
      return this;
   }

   private _addRarity(rarity: TypeChance<Rarity>): this {
      this.rarities.push(rarity);
      return this;
   }

   public addRarity(rarity: Rarity, chance: number): this {
      return this._addRarity({ chance, property: rarity });
   }


   private _addType(type: TypeChance<Type>): this {
      this.types.push(type);
      return this;
   }

   public addType(type: Type, chance: number, value?: number, maxValue?: number): this {
      return this._addType({ chance: chance, property: type, value: { min: value, max: maxValue || value } } as TypeChance<Type>);
   }

   private _addAttribute(attribute: TypeChance<Attribute>): this {
      this.attributes.push(attribute);
      return this;
   }

   public addAttribute(attribute: Attribute, chance: number, value?: number, maxValue?: number): this {
      return this._addAttribute({ chance, property: attribute, value: { min: value, max: maxValue || value } });
   }

   private _addMaterial(material: TypeChance<Material>): this {
      this.materials.push(material);
      return this;
   }

   public addMaterial(material: Material, chance: number): this {
      return this._addMaterial({ chance, property: material });
   }

   private _addSlot(slot: TypeChance<Slot>): this {
      this.slots.push(slot);
      return this;
   }

   public addSlot(slot: Slot, chance: number): this {
      return this._addSlot({ chance, property: slot });
   }


   private _getPropertyByChance<T extends Codeable & Rollable>(propList: Array<TypeChance<T>>): TypeChance<T> {
      const _propList = propList.sort((a: TypeChance<T>, b: TypeChance<T>) => b.chance - a.chance);
      for (let i = 0; i < _propList.length; i++) {
         // if (i == _propList.length - 1) {
         //    return _propList[i].property;
         // }
         const roll = this.random.double() * 100;
         // console.log("dropChance", dropChance, _propList[i].chance);
         if (_propList[i].chance >= roll) {
            _propList[i].property._roll = roll;
            _propList[i].property._chance = _propList[i].chance;
            return _propList[i];
         }
      }
      return _propList[0];
   }

   public dropItem(): Item {
      return this.dropRandomItem();
      const itemChance: number = this.items.reduce((prev, cur) => prev + cur.chance, 0);
      const randomItemChance = 100 - itemChance;
      const chance = this.random.double() * 100;
      if (chance < randomItemChance) {
         return this.dropRandomItem();
      } else {
         // same logic as _getPropertyByChance
         const _itemlist = this.items.sort((a: TypeChanceItem, b: TypeChanceItem) => b.chance - a.chance);
         for (let i = 0; i < _itemlist.length; i++) {
            const roll = this.random.double() * 100;
            // console.log("roll", roll, _itemlist[i].chance);
            if (_itemlist[i].chance >= roll) {
               return _itemlist[i].item;
            }
         }
         return null;
      }
   }

   private dropRandomItem(): Item {
      const ID: string = uuid.v4();
      const item: Item = new Item();
      const level: number = this.random.range(this.itemLevel.min, this.itemLevel.max, true);

      item.setId(ID).setItemLevel(level);
      if (this._name) {
         item.setName(this.name);
      }

      if (this.rarities.length) {
         const rarity: Rarity = this._getPropertyByChance<Rarity>(this.rarities).property;
         item.setRarity(rarity);
      }

      if (this.types.length) {
         const type: TypeChance<Type> = this._getPropertyByChance<Type>(this.types);
         item.setType(type.property);
         const defaultAttr = item.type.defaultAttribute;
         item.setDefaultAttribute({ ...defaultAttr, value: this.random.range(type.value?.min || 0, type.value?.max || item.itemLevel) });


         const itemMaterials: Array<Material> = item.type.materials;
         let mergedMaterials: Array<TypeChance<Material>> = [];
         const materialsNotInDroptable: Array<TypeChance<Material>> = [];
         // TODO randomize item materials order
         for (let index = 0; index < itemMaterials.length; index++) {
            const itemMaterial = itemMaterials[index];
            const itemMaterialInDropMaterial = this.materials?.find(i => i.property.code === itemMaterial.code);
            if (itemMaterialInDropMaterial) {
               mergedMaterials.push(itemMaterialInDropMaterial);
            } else {
               materialsNotInDroptable.push({ chance: 100 / itemMaterials.length, property: itemMaterial });
            }
         }
         if (!mergedMaterials.length) {
            mergedMaterials = materialsNotInDroptable;
         }

         if (mergedMaterials.length) {
            const material: Material = this._getPropertyByChance<Material>(mergedMaterials).property;
            item.setMaterial(material);
         }

         const itemTypeSlot: Slot = item.type.slot;
         if (itemTypeSlot) {
            item.setSlot(itemTypeSlot);
         } else if (this.slots.length) {
            const slot: Slot = this._getPropertyByChance<Slot>(this.slots).property;
            item.setSlot(slot);
         }
      }

      const maxAttributeCount = item.rarity.attributeCount;
      const attributesToAdd: Array<TypeChance<Attribute>> = [];
      for (const attr of this.attributes) {
         if (!!item.defaultAttribute && item.defaultAttribute.code === attr.property.code) {
            continue;
         }
         attributesToAdd.push(attr);
      }

      for (let i = 0; i < maxAttributeCount; i++) {
         if (!attributesToAdd.length) {
            break;
         }
         const attrChance: TypeChance<Attribute> = this._getPropertyByChance<Attribute>(attributesToAdd);
         item.addAttribute({ ...attrChance.property, value: this.random.range(attrChance?.value?.min || 0, attrChance?.value?.max || item.itemLevel) });
         const indx = attributesToAdd.indexOf(attrChance);
         if (indx >= 0) {
            attributesToAdd.splice(indx, 1);
         }
      }

      return item;
   }

}


export type TypeMinMax = {
   min: number,
   max: number,
};

export type TypeChance<T> = {
   chance: number,
   property: T,
   value?: TypeMinMax,
};

export type TypeChanceItem = {
   chance: number,
   item: Item,
   level?: TypeMinMax
};