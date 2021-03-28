import * as Attributes from "./Attributes";
import Codeable from "./interfaces/Codeable";
import * as Materials from "./Materials";
import * as Slots from "./Slots";

const allMaterials: Array<Materials.Material> = Object.values(Materials);

interface Type extends Codeable {
   slot: Slots.Slot,
   defaultAttribute: Attributes.Attribute,
   materials: Array<Materials.Material>,
}


const TypeCape: Type = {
   code: "cape",
   name: "Cape",
   slot: Slots.SlotBack,
   defaultAttribute: Attributes.AttributeArmor,
   materials: [Materials.MaterialCloth]
};

const TypeChest: Type = {
   code: "chest",
   name: "Chest",
   slot: Slots.SlotChest,
   defaultAttribute: Attributes.AttributeArmor,
   materials: allMaterials,
};

const TypeFoot: Type = {
   code: "foot",
   name: "Foot",
   slot: Slots.SlotFoot,
   defaultAttribute: Attributes.AttributeArmor,
   materials: allMaterials,
};

const TypeLegs: Type = {
   code: "legs",
   name: "Legs",
   slot: Slots.SlotLegs,
   defaultAttribute: Attributes.AttributeArmor,
   materials: allMaterials,
};

const TypeRing: Type = {
   code: "ring",
   name: "Ring",
   slot: Slots.SlotFinger,
   defaultAttribute: Attributes.AttributeArmor,
   materials: [],
};

const TypeShield: Type = {
   code: "shield",
   name: "Shield",
   slot: Slots.SlotHand,
   defaultAttribute: Attributes.AttributeArmor,
   materials: [Materials.MaterialMailPlate],
};

const TypeShoulder: Type = {
   code: "shoulder",
   name: "Shoulder",
   slot: Slots.SlotShoulder,
   defaultAttribute: Attributes.AttributeArmor,
   materials: allMaterials,
};

const TypeSword: Type = {
   code: "sword",
   name: "Sword",
   slot: Slots.SlotHand,
   defaultAttribute: Attributes.AttributeStrength,
   materials: [Attributes.AttributeStrength],
};

export {
   Type,
   TypeCape,
   TypeChest,
   TypeFoot,
   TypeLegs,
   TypeRing,
   TypeShield,
   TypeShoulder,
   TypeSword,
};