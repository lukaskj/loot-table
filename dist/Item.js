"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor() {
        this._quality = 100;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get code() {
        return this._code;
    }
    get itemLevel() {
        return this._itemLevel;
    }
    get quality() {
        return this._quality;
    }
    get type() {
        return this._type;
    }
    get material() {
        return this._material;
    }
    get rarity() {
        return this._rarity;
    }
    get slot() {
        return this._slot;
    }
    get attributes() {
        return this._attributes;
    }
    get baseAttributes() {
        return this._baseAttributes;
    }
    get roll() {
        return this._roll;
    }
    setId(id) {
        this._id = id;
        return this;
    }
    setSlot(slot) {
        this._slot = slot;
        return this;
    }
    setRarity(rarity) {
        this._rarity = rarity;
        return this;
    }
    setMaterial(Material) {
        this._material = Material;
        return this;
    }
    setItemLevel(itemLevel) {
        this._itemLevel = itemLevel;
        return this;
    }
    setQuality(quality) {
        this._quality = quality;
        return this;
    }
    setType(type) {
        this._type = type;
        return this;
    }
    addAttribute(stat, value) {
        const baseAttribute = Object.assign({}, stat);
        if (!this._attributes) {
            this._attributes = [];
        }
        if (!this._baseAttributes) {
            this._baseAttributes = [];
        }
        if (value) {
            stat.value = (value * this.quality) / 100;
            baseAttribute.value = value;
        }
        else if (stat.value) {
            baseAttribute.value = stat.value;
            stat.value = (stat.value * this.quality) / 100;
        }
        this.attributes.push(stat);
        this.baseAttributes.push(baseAttribute);
        return this;
    }
    setAttributes(stats) {
        this._attributes.splice(0, this._attributes.length);
        this._baseAttributes.splice(0, this._baseAttributes.length);
        stats.forEach((att) => this.addAttribute(att));
        return this;
    }
    setName(name) {
        this._name = name;
        return this;
    }
    getName() {
        return this._name;
    }
    getCode() {
        return this._code;
    }
    setRoll(roll) {
        this._roll = roll;
        return this;
    }
    getRoll() {
        return this._roll;
    }
    toJson() {
        const copy = Object.assign({}, this);
        Object.keys(copy)
            .filter((k) => k[0] === "_" && k != "_roll")
            .forEach((k) => {
            copy[k.replace("_", "")] = copy[k];
            delete copy[k];
        });
        return copy;
    }
}
exports.default = Item;
//# sourceMappingURL=Item.js.map