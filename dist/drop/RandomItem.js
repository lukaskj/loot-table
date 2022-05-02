"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const Item_1 = require("../Item");
const Random_1 = require("../utils/Random");
const Util_1 = require("../utils/Util");
class RandomItem {
    constructor(seed) {
        this.itemLevel = { min: 0, max: 100 };
        this._quality = { min: 0, max: 100 };
        this.items = [];
        this.rarities = [];
        this.attributes = [];
        this.materials = [];
        this.slots = [];
        this.types = [];
        this.random = new Random_1.default(seed);
    }
    get name() {
        return this._name;
    }
    get quality() {
        return this._quality;
    }
    setName(name) {
        this._name = name;
        return this;
    }
    setQuality(quality) {
        if ((0, Util_1.isNumber)(quality)) {
            this._quality = { min: quality, max: quality };
        }
        else {
            this._quality = quality;
        }
        return this;
    }
    setItemLevel(itemLevel) {
        if ((0, Util_1.isNumber)(itemLevel)) {
            this.itemLevel = { min: itemLevel, max: itemLevel };
        }
        else {
            this.itemLevel = itemLevel;
        }
        return this;
    }
    _addRarity(rarity) {
        this.rarities.push(rarity);
        return this;
    }
    addRarity(rarity, chance) {
        return this._addRarity({ chance, property: rarity });
    }
    _addType(type) {
        this.types.push(type);
        return this;
    }
    addType(type, chance) {
        return this._addType({ chance: chance, property: type });
    }
    _addAttribute(attribute) {
        this.attributes.push(attribute);
        return this;
    }
    addAttribute(attribute, chance, value) {
        const rangeValue = (0, Util_1.isNumber)(value) ? { min: value, max: value } : value;
        return this._addAttribute({ chance, property: attribute, value: rangeValue });
    }
    _addMaterial(material) {
        this.materials.push(material);
        return this;
    }
    addMaterial(material, chance) {
        return this._addMaterial({ chance, property: material });
    }
    _addSlot(slot) {
        this.slots.push(slot);
        return this;
    }
    addSlot(slot, chance) {
        return this._addSlot({ chance, property: slot });
    }
    _getPropertyByChance(propList) {
        const _propList = propList.sort((a, b) => b.chance - a.chance);
        for (let i = 0; i < _propList.length; i++) {
            const roll = this.random.double() * 100;
            if (_propList[i].chance >= roll) {
                _propList[i].property._roll = roll;
                _propList[i].property._chance = _propList[i].chance;
                return _propList[i];
            }
        }
        return _propList[0];
    }
    dropItem() {
        return this.dropRandomItem();
    }
    dropRandomItem() {
        var _a, _b, _c;
        const ID = uuid.v4();
        const item = new Item_1.default();
        const level = this.random.range(this.itemLevel.min, this.itemLevel.max, true);
        item.setId(ID).setItemLevel(level);
        if (this.quality) {
            const quality = this.random.range(this.quality.min, this.quality.max, true);
            item.setQuality(quality);
        }
        if (this._name) {
            item.setName(this.name);
        }
        if (this.rarities.length) {
            const rarity = this._getPropertyByChance(this.rarities).property;
            item.setRarity(rarity);
        }
        if (this.types.length) {
            const type = this._getPropertyByChance(this.types);
            item.setType(type.property);
            const itemMaterials = item.type.materials;
            let mergedMaterials = [];
            const materialsNotInDroptable = [];
            for (let index = 0; index < itemMaterials.length; index++) {
                const itemMaterial = itemMaterials[index];
                const itemMaterialInDropMaterial = (_a = this.materials) === null || _a === void 0 ? void 0 : _a.find((i) => i.property.code === itemMaterial.code);
                if (itemMaterialInDropMaterial) {
                    mergedMaterials.push(itemMaterialInDropMaterial);
                }
                else {
                    materialsNotInDroptable.push({ chance: 100 / itemMaterials.length, property: itemMaterial });
                }
            }
            if (!mergedMaterials.length) {
                mergedMaterials = materialsNotInDroptable;
            }
            if (mergedMaterials.length) {
                const material = this._getPropertyByChance(mergedMaterials).property;
                item.setMaterial(material);
            }
        }
        if (!!item.type && item.type.slot) {
            item.setSlot(item.type.slot);
        }
        else if (this.slots.length) {
            const slot = this._getPropertyByChance(this.slots).property;
            item.setSlot(slot);
        }
        const maxAttributeCount = item.rarity.attributeCount;
        const attributesToAdd = [];
        for (const attr of this.attributes) {
            attributesToAdd.push(attr);
        }
        for (let i = 0; i < maxAttributeCount; i++) {
            if (!attributesToAdd.length) {
                break;
            }
            const attrChance = this._getPropertyByChance(attributesToAdd);
            let value;
            if ((0, Util_1.isNumber)(attrChance.value)) {
                value = attrChance.value;
            }
            else {
                value = this.random.range(((_b = attrChance === null || attrChance === void 0 ? void 0 : attrChance.value) === null || _b === void 0 ? void 0 : _b.min) || 0, ((_c = attrChance === null || attrChance === void 0 ? void 0 : attrChance.value) === null || _c === void 0 ? void 0 : _c.max) || item.itemLevel);
            }
            item.addAttribute(Object.assign(Object.assign({}, attrChance.property), { value }));
            const indx = attributesToAdd.indexOf(attrChance);
            if (indx >= 0) {
                attributesToAdd.splice(indx, 1);
            }
        }
        return item;
    }
    static fromJson(randomItem) {
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
            randomItem.rarities.forEach((it) => rdItemResult._addRarity({
                chance: it.chance,
                property: it.rarity,
                value: it.value,
            }));
        }
        if (!!randomItem.attributes && Array.isArray(randomItem.attributes)) {
            randomItem.attributes.forEach((it) => rdItemResult._addAttribute({
                chance: it.chance,
                property: it.attribute,
                value: it.value,
            }));
        }
        if (!!randomItem.slots && Array.isArray(randomItem.slots)) {
            randomItem.slots.forEach((it) => rdItemResult._addSlot({
                chance: it.chance,
                property: it.slot,
                value: it.value,
            }));
        }
        if (!!randomItem.types && Array.isArray(randomItem.types)) {
            randomItem.types.forEach((it) => rdItemResult._addType({
                chance: it.chance,
                property: it.type,
                value: it.value,
            }));
        }
        if (!!randomItem.materials && Array.isArray(randomItem.materials)) {
            randomItem.materials.forEach((it) => rdItemResult._addMaterial({
                chance: it.chance,
                property: it.material,
                value: it.value,
            }));
        }
        return rdItemResult;
    }
}
exports.default = RandomItem;
//# sourceMappingURL=RandomItem.js.map