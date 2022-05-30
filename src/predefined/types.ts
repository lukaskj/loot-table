import { Slots } from ".";
import { Type } from "../entities/type";

const TypeCape = new Type({
  code: "cape",
  name: "Cape",
  slot: Slots.SlotBack,
});

const TypeChest = new Type({
  code: "chest",
  name: "Chest",
  slot: Slots.SlotChest,
});

const TypeFoot = new Type({
  code: "foot",
  name: "Foot",
  slot: Slots.SlotFoot,
});

const TypeLegs = new Type({
  code: "legs",
  name: "Legs",
  slot: Slots.SlotLegs,
});

const TypeRing = new Type({
  code: "ring",
  name: "Ring",
  slot: Slots.SlotFinger,
});

const TypeShoulder = new Type({
  code: "shoulder",
  name: "Shoulder",
  slot: Slots.SlotShoulder,
});

const TypeBelt = new Type({
  code: "belt",
  name: "Belt",
  slot: Slots.SlotShoulder,
});

const TypeShield = new Type({
  code: "shield",
  name: "Shield",
  slot: Slots.SlotHand,
});

const TypeMeleeWeapon = new Type({
  code: "melee-weapon",
  name: "Melee Weapon",
  slot: Slots.SlotHand,
});

const TypeRangedWeapon = new Type({
  code: "ranged-weapon",
  name: "Ranged Weapon",
  slot: Slots.SlotHand,
});

const TypeMagicWeapon = new Type({
  code: "magic-weapon",
  name: "Magic Weapon",
  slot: Slots.SlotHand,
});

export {
  TypeCape,
  TypeChest,
  TypeFoot,
  TypeLegs,
  TypeRing,
  TypeShield,
  TypeShoulder,
  TypeBelt,
  TypeMeleeWeapon,
  TypeRangedWeapon,
  TypeMagicWeapon,
};
