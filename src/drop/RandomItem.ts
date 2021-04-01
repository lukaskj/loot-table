import Codeable from "../interfaces/Codeable";
import Item from "../Item";
import Random from "../utils/Random";
import * as uuid from "uuid";
import { RarityInterface } from "../Rarities";
import { SlotInterface } from "../Slots";
import { MaterialInterface } from "../Materials";
import { TypeInterface } from "../Types";
import { AttributeInterface } from "../Attributes";
import Rollable from "../interfaces/Rollable";
import { isNumber } from "../utils/Util";
import RandomItemJsonInterface from "../interfaces/RandomItemJsonInterface";

export default class RandomItem {
   private _name: string;
   private itemLevel: TypeRange = { min: 0, max: 100 };
   private _quality: TypeRange = { min: 0, max: 100 };
   private items: Array<TypeChanceItem> = [];
   private rarities: Array<TypeChance<RarityInterface>> = [];
   private attributes: Array<TypeChance<AttributeInterface>> = [];
   private materials: Array<TypeChance<MaterialInterface>> = [];
   private slots: Array<TypeChance<SlotInterface>> = [];
   private types: Array<TypeChance<TypeInterface>> = [];


   public get name(): string {
      return this._name;
   }

   public get quality(): TypeRange {
      return this._quality;
   }

   public setName(name: string): this {
      this._name = name;
      return this;
   }

   public setQuality(quality: TypeRange | number): this {
      if (isNumber(quality)) {
         this._quality = { min: quality, max: quality };
      } else {
         this._quality = quality;
      }
      return this;
   }


   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public setItemLevel(itemLevel: TypeRange | number): this {
      if (isNumber(itemLevel)) {
         this.itemLevel = { min: itemLevel, max: itemLevel };
      } else {
         this.itemLevel = itemLevel;
      }
      return this;
   }

   private _addRarity(rarity: TypeChance<RarityInterface>): this {
      this.rarities.push(rarity);
      return this;
   }

   public addRarity(rarity: RarityInterface, chance: number): this {
      return this._addRarity({ chance, property: rarity });
   }


   private _addType(type: TypeChance<TypeInterface>): this {
      this.types.push(type);
      return this;
   }

   public addType(type: TypeInterface, chance: number): this {
      return this._addType({ chance: chance, property: type } as TypeChance<TypeInterface>);
   }

   private _addAttribute(attribute: TypeChance<AttributeInterface>): this {
      this.attributes.push(attribute);
      return this;
   }

   public addAttribute(attribute: AttributeInterface, chance: number, value?: TypeRange | number): this {
      const rangeValue = isNumber(value) ? { min: value, max: value } : value;
      return this._addAttribute({ chance, property: attribute, value: rangeValue });
   }

   private _addMaterial(material: TypeChance<MaterialInterface>): this {
      this.materials.push(material);
      return this;
   }

   public addMaterial(material: MaterialInterface, chance: number): this {
      return this._addMaterial({ chance, property: material });
   }

   private _addSlot(slot: TypeChance<SlotInterface>): this {
      this.slots.push(slot);
      return this;
   }

   public addSlot(slot: SlotInterface, chance: number): this {
      return this._addSlot({ chance, property: slot });
   }


   private _getPropertyByChance<T extends Codeable & Rollable>(propList: Array<TypeChance<T>>): TypeChance<T> {
      const _propList = propList.sort((a: TypeChance<T>, b: TypeChance<T>) => b.chance - a.chance);
      for (let i = 0; i < _propList.length; i++) {
         // if (i == _propList.length - 1) {
         //    return _propList[i].property;
         // }
         const roll = this.random.double() * 100;
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
      item
         .setId(ID)
         .setItemLevel(level);

      if (this.quality) {
         const quality: number = this.random.range(this.quality.min, this.quality.max, true);
         item.setQuality(quality);
      }

      if (this._name) {
         item.setName(this.name);
      }

      if (this.rarities.length) {
         const rarity: RarityInterface = this._getPropertyByChance<RarityInterface>(this.rarities).property;
         item.setRarity(rarity);
      }

      if (this.types.length) {
         const type: TypeChance<TypeInterface> = this._getPropertyByChance<TypeInterface>(this.types);
         item.setType(type.property);

         const itemMaterials: Array<MaterialInterface> = item.type.materials;
         let mergedMaterials: Array<TypeChance<MaterialInterface>> = [];
         const materialsNotInDroptable: Array<TypeChance<MaterialInterface>> = [];
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
            const material: MaterialInterface = this._getPropertyByChance<MaterialInterface>(mergedMaterials).property;
            item.setMaterial(material);
         }
      }

      if (!!item.type && item.type.slot) {
         item.setSlot(item.type.slot);
      } else if (this.slots.length) {
         const slot: SlotInterface = this._getPropertyByChance<SlotInterface>(this.slots).property;
         item.setSlot(slot);
      }

      const maxAttributeCount = item.rarity.attributeCount;
      const attributesToAdd: Array<TypeChance<AttributeInterface>> = [];
      for (const attr of this.attributes) {
         attributesToAdd.push(attr);
      }

      for (let i = 0; i < maxAttributeCount; i++) {
         if (!attributesToAdd.length) {
            break;
         }
         const attrChance: TypeChance<AttributeInterface> = this._getPropertyByChance<AttributeInterface>(attributesToAdd);
         let value: number;
         if (isNumber(attrChance.value)) {
            value = attrChance.value;
         } else {
            value = this.random.range(attrChance?.value?.min || 0, attrChance?.value?.max || item.itemLevel);
         }
         item.addAttribute({ ...attrChance.property, value });
         const indx = attributesToAdd.indexOf(attrChance);
         if (indx >= 0) {
            attributesToAdd.splice(indx, 1);
         }
      }

      return item;
   }

   public static fromJson(randomItem: RandomItemJsonInterface): RandomItem {
      const seed = randomItem.seed;
      const rdItemResult = new RandomItem(seed);

      if (!!randomItem.name) {
         rdItemResult.setName(randomItem.name);
      }

      if (!!randomItem.itemLevel) {
         rdItemResult.setItemLevel(randomItem.itemLevel);
      }

      if (!!randomItem.quality) {
         rdItemResult.setQuality(randomItem.quality);
      }
      if (!!randomItem.rarities && Array.isArray(randomItem.rarities)) {
         randomItem.rarities.forEach(it => rdItemResult._addRarity({
            chance: it.chance,
            property: it.rarity,
            value: it.value
         }));
      }

      if (!!randomItem.attributes && Array.isArray(randomItem.attributes)) {
         randomItem.attributes.forEach(it => rdItemResult._addAttribute({
            chance: it.chance,
            property: it.attribute,
            value: it.value
         }));
      }

      if (!!randomItem.slots && Array.isArray(randomItem.slots)) {
         randomItem.slots.forEach(it => rdItemResult._addSlot({
            chance: it.chance,
            property: it.slot,
            value: it.value
         }));
      }

      if (!!randomItem.types && Array.isArray(randomItem.types)) {
         randomItem.types.forEach(it => rdItemResult._addType({
            chance: it.chance,
            property: it.type,
            value: it.value
         }));
      }

      if (!!randomItem.materials && Array.isArray(randomItem.materials)) {
         randomItem.materials.forEach(it => rdItemResult._addMaterial({
            chance: it.chance,
            property: it.material,
            value: it.value
         }));
      }

      return rdItemResult;
   }

}


export interface TypeRange {
   min: number,
   max: number,
}

export type TypeChance<T> = {
   chance: number,
   property: T,
   value?: TypeRange | number,
};

export type TypeChanceRarity = {
   chance: number,
   rarity: RarityInterface,
   value?: TypeRange | number,
};

export type TypeChanceAttribute = {
   chance: number,
   attribute: AttributeInterface,
   value?: TypeRange | number,
};

export type TypeChanceMaterial = {
   chance: number,
   material: MaterialInterface,
   value?: TypeRange | number,
};

export type TypeChanceSlot = {
   chance: number,
   slot: SlotInterface,
   value?: TypeRange | number,
};

export type TypeChanceType = {
   chance: number,
   type: TypeInterface,
   value?: TypeRange | number,
};

export type TypeChanceItem = {
   chance: number,
   item: Item,
   level?: TypeRange
};