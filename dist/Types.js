"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSword = exports.TypeBelt = exports.TypeShoulder = exports.TypeShield = exports.TypeRing = exports.TypeLegs = exports.TypeFoot = exports.TypeChest = exports.TypeCape = void 0;
const Materials = require("./Materials");
const Slots = require("./Slots");
const allMaterials = Object.values(Materials);
const TypeCape = {
    code: "cape",
    name: "Cape",
    slot: Slots.SlotBack,
    materials: [Materials.MaterialCloth],
};
exports.TypeCape = TypeCape;
const TypeChest = {
    code: "chest",
    name: "Chest",
    slot: Slots.SlotChest,
    materials: allMaterials,
};
exports.TypeChest = TypeChest;
const TypeFoot = {
    code: "foot",
    name: "Foot",
    slot: Slots.SlotFoot,
    materials: allMaterials,
};
exports.TypeFoot = TypeFoot;
const TypeLegs = {
    code: "legs",
    name: "Legs",
    slot: Slots.SlotLegs,
    materials: allMaterials,
};
exports.TypeLegs = TypeLegs;
const TypeRing = {
    code: "ring",
    name: "Ring",
    slot: Slots.SlotFinger,
    materials: [],
};
exports.TypeRing = TypeRing;
const TypeShoulder = {
    code: "shoulder",
    name: "Shoulder",
    slot: Slots.SlotShoulder,
    materials: allMaterials,
};
exports.TypeShoulder = TypeShoulder;
const TypeBelt = {
    code: "belt",
    name: "Belt",
    slot: Slots.SlotShoulder,
    materials: allMaterials,
};
exports.TypeBelt = TypeBelt;
const TypeShield = {
    code: "shield",
    name: "Shield",
    slot: Slots.SlotHand,
    materials: [Materials.MaterialMailPlate],
};
exports.TypeShield = TypeShield;
const TypeSword = {
    code: "sword",
    name: "Sword",
    slot: Slots.SlotHand,
    materials: [Materials.MaterialBronze],
};
exports.TypeSword = TypeSword;
//# sourceMappingURL=Types.js.map