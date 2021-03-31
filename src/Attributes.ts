import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface AttributeInterface extends Codeable, Rollable {
   value?: number,
}

const AttributeStrength: AttributeInterface = {
   code: "Strength",
   name: "Strength",
};

const AttributeAttackSpeed: AttributeInterface = {
   code: "agility",
   name: "Agility",
};

const AttributeArmor: AttributeInterface = {
   code: "armor",
   name: "Armor",
};

const AttributeCritChance: AttributeInterface = {
   code: "critchance",
   name: "Crit Chance",
};

const AttributeCritDamage: AttributeInterface = {
   code: "critdamage",
   name: "Crit Damage",
};

const AttributeHealth: AttributeInterface = {
   code: "health",
   name: "Health",
};

const AttributeIntelligence: AttributeInterface = {
   code: "intelligence",
   name: "Intelligence",
};

const AttributeManaRegen: AttributeInterface = {
   code: "manaregen",
   name: "Mana Regen",
};

const AttributeLuck: AttributeInterface = {
   code: "luck",
   name: "Luck",
};

export {
   AttributeInterface,
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