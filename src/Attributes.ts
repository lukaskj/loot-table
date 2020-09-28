import Codeable from "./interfaces/Codeable";

interface Attribute extends Codeable {
   value?: number,
}

const AttributeAgility: Attribute = {
   code: 'agility',
   name: 'Agility',
}

const AttributeArmor: Attribute = {
   code: 'armor',
   name: 'Armor',
}

const AttributeCritChance: Attribute = {
   code: 'critchance',
   name: 'Crit Chance',
}

const AttributeHealth: Attribute = {
   code: 'health',
   name: 'Health',
}

const AttributeIntelligence: Attribute = {
   code: 'intelligence',
   name: 'Intelligence',
}

const AttributeManaRegen: Attribute = {
   code: 'manaregen',
   name: 'Mana Regen',
}

const AttributeStrength: Attribute = {
   code: 'Strength',
   name: 'Strength',
}

export {
   Attribute,
   AttributeAgility,
   AttributeArmor,
   AttributeCritChance,
   AttributeHealth,
   AttributeIntelligence,
   AttributeManaRegen,
   AttributeStrength,
}