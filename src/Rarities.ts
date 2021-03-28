import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface Rarity extends Codeable, Rollable {
   multiplier: number,
   attributeCount: number,
}

const RarityCommon: Rarity = {
   code: "common",
   name: "Common",
   multiplier: 1,
   attributeCount: 0,
};

const RarityUncommon: Rarity = {
   code: "uncommon",
   name: "Uncommon",
   multiplier: 2,
   attributeCount: 1,
};

const RarityRare: Rarity = {
   code: "rare",
   name: "Rare",
   multiplier: 3,
   attributeCount: 2,
};

const RarityEpic: Rarity = {
   code: "epic",
   name: "Epic",
   multiplier: 4,
   attributeCount: 3,
};

const RarityLegendary: Rarity = {
   code: "legendary",
   name: "Legendary",
   multiplier: 5,
   attributeCount: 4,
};

const RarityMythic: Rarity = {
   code: "mythic",
   name: "Mythic",
   multiplier: 6,
   attributeCount: 5,
};

const RarityAngelic: Rarity = {
   code: "angelic",
   name: "Angelic",
   multiplier: 7,
   attributeCount: 6,
};


export {
   Rarity,
   RarityCommon,
   RarityUncommon,
   RarityRare,
   RarityEpic,
   RarityLegendary,
   RarityMythic,
   RarityAngelic,
};