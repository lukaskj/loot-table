import { Attribute } from "../entities/attribute";

const AttributeStrength = new Attribute({
  code: "str",
  name: "Strength",
});

const AttributeIntelligence = new Attribute({
  code: "int",
  name: "Intelligence",
});

const AttributeAttackSpeed = new Attribute({
  code: "as",
  name: "Attack Speed",
});

const AttributeArmor = new Attribute({
  code: "armor",
  name: "Armor",
});

const AttributeCritChance = new Attribute({
  code: "critchance",
  name: "Crit Chance",
});

const AttributeCritDamage = new Attribute({
  code: "critdamage",
  name: "Crit Damage",
});

const AttributeHealth = new Attribute({
  code: "hp",
  name: "Health",
});

const AttributeManaRegen = new Attribute({
  code: "manaregen",
  name: "Mana Regen",
});

const AttributeLuck = new Attribute({
  code: "luck",
  name: "Luck",
});

export {
  AttributeAttackSpeed,
  AttributeArmor,
  AttributeCritChance,
  AttributeHealth,
  AttributeIntelligence,
  AttributeManaRegen,
  AttributeStrength,
  AttributeCritDamage,
  AttributeLuck,
};
