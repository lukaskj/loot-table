import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";
import * as Materials from "./Materials";
import * as Slots from "./Slots";

const allMaterials: Array<Materials.MaterialInterface> = Object.values(Materials);

interface TypeInterface extends Codeable, Rollable {
   slot: Slots.SlotInterface,
   materials: Array<Materials.MaterialInterface>,
}


const TypeCape: TypeInterface = {
   code: "cape",
   name: "Cape",
   slot: Slots.SlotBack,
   materials: [Materials.MaterialCloth]
};

const TypeChest: TypeInterface = {
   code: "chest",
   name: "Chest",
   slot: Slots.SlotChest,
   materials: allMaterials,
};

const TypeFoot: TypeInterface = {
   code: "foot",
   name: "Foot",
   slot: Slots.SlotFoot,
   materials: allMaterials,
};

const TypeLegs: TypeInterface = {
   code: "legs",
   name: "Legs",
   slot: Slots.SlotLegs,
   materials: allMaterials,
};

const TypeRing: TypeInterface = {
   code: "ring",
   name: "Ring",
   slot: Slots.SlotFinger,
   materials: [],
};

const TypeShield: TypeInterface = {
   code: "shield",
   name: "Shield",
   slot: Slots.SlotHand,
   materials: [Materials.MaterialMailPlate],
};

const TypeShoulder: TypeInterface = {
   code: "shoulder",
   name: "Shoulder",
   slot: Slots.SlotShoulder,
   materials: allMaterials,
};

const TypeSword: TypeInterface = {
   code: "sword",
   name: "Sword",
   slot: Slots.SlotHand,
   materials: [Materials.MaterialBronze],
};

export {
   TypeInterface,
   TypeCape,
   TypeChest,
   TypeFoot,
   TypeLegs,
   TypeRing,
   TypeShield,
   TypeShoulder,
   TypeSword,
};