import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface AttributeInterface extends Codeable, Rollable {
  value?: number;
}

const AttributeStrength: AttributeInterface = {
  code: "str",
  name: "Strength",
};

const AttributeIntelligence: AttributeInterface = {
  code: "int",
  name: "Intelligence",
};

const AttributeAttackSpeed: AttributeInterface = {
  code: "as",
  name: "Attack Speed",
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
  code: "hp",
  name: "Health",
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
  AttributeLuck,
};
