import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface RarityInterface extends Codeable, Rollable {
   multiplier: number,
   attributeCount: number,
}

const RarityCommon: RarityInterface = {
   code: "common",
   name: "Common",
   multiplier: 1,
   attributeCount: 1,
};

const RarityUncommon: RarityInterface = {
   code: "uncommon",
   name: "Uncommon",
   multiplier: 2,
   attributeCount: 1,
};

const RarityRare: RarityInterface = {
   code: "rare",
   name: "Rare",
   multiplier: 3,
   attributeCount: 2,
};

const RarityEpic: RarityInterface = {
   code: "epic",
   name: "Epic",
   multiplier: 4,
   attributeCount: 3,
};

const RarityLegendary: RarityInterface = {
   code: "legendary",
   name: "Legendary",
   multiplier: 5,
   attributeCount: 4,
};

const RarityMythic: RarityInterface = {
   code: "mythic",
   name: "Mythic",
   multiplier: 6,
   attributeCount: 5,
};

const RarityAngelic: RarityInterface = {
   code: "angelic",
   name: "Angelic",
   multiplier: 7,
   attributeCount: 6,
};


export {
   RarityInterface,
   RarityCommon,
   RarityUncommon,
   RarityRare,
   RarityEpic,
   RarityLegendary,
   RarityMythic,
   RarityAngelic,
};