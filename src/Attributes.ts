import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface Attribute extends Codeable, Rollable {
   value?: number,
}

const AttributeStrength: Attribute = {
   code: "Strength",
   name: "Strength",
};

const AttributeAttackSpeed: Attribute = {
   code: "agility",
   name: "Agility",
};

const AttributeArmor: Attribute = {
   code: "armor",
   name: "Armor",
};

const AttributeCritChance: Attribute = {
   code: "critchance",
   name: "Crit Chance",
};

const AttributeCritDamage: Attribute = {
   code: "critdamage",
   name: "Crit Damage",
};

const AttributeHealth: Attribute = {
   code: "health",
   name: "Health",
};

const AttributeIntelligence: Attribute = {
   code: "intelligence",
   name: "Intelligence",
};

const AttributeManaRegen: Attribute = {
   code: "manaregen",
   name: "Mana Regen",
};

const AttributeLuck: Attribute = {
   code: "luck",
   name: "Luck",
};

export {
   Attribute,
   AttributeAttackSpeed,
   AttributeArmor,
   AttributeCritChance,
   AttributeHealth,
   AttributeIntelligence,
   AttributeManaRegen,
   AttributeStrength,
   AttributeCritDamage,
   AttributeLuck
};